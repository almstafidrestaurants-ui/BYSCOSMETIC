// بيانات الدول - كل دولة سعرها مستقل من catalog.js
const COUNTRIES = [
    { code: "LB", name: "Lebanon", flag: "🇱🇧", currency: "USD" },
    { code: "SY", name: "Syria", flag: "🇸🇾", currency: "SYP" },
    { code: "JO", name: "Jordan", flag: "🇯🇴", currency: "JOD" },
    { code: "KW", name: "Kuwait", flag: "🇰🇼", currency: "KWD" },
    { code: "EG", name: "Egypt", flag: "🇪🇬", currency: "EGP" }
];

// التصنيفات - يمكنك تغيير صورة كل تصنيف من المجلد images/categories
const CATEGORIES = [
    { name: "Skincare", image: "images/categories/skincare.webp", words: ["face", "serum", "cream", "toner", "cleanser", "eye", "collagen", "niacinamide", "vitamin c", "skin"] },
    { name: "Body Care", image: "images/categories/body-care.webp", words: ["body", "cellulite", "stretch", "butter", "hand", "foot", "firming"] },
    { name: "Hair Care", image: "images/categories/hair-care.webp", words: ["hair", "shampoo", "conditioner", "scalp"] },
    { name: "Perfumes", image: "images/categories/perfumes.webp", words: ["perfume", "fragrance", "splash", "eau de"] },
    { name: "Feminine Care", image: "images/categories/feminine-care.webp", words: ["intimate", "feminine", "vaginal"] },
    { name: "Bath & Body", image: "images/categories/bath-and-body.webp", words: ["bath", "soap", "loofah", "scrub", "moroccan"] },
    { name: "Sun Care", image: "images/categories/sun-care.webp", words: ["sun", "spf", "sunscreen"] },
    { name: "Accessories", image: "images/categories/accessories.webp", words: ["accessor", "brush", "loofah"] }
];

// الحاجات الجمالية - يتم فلترة المنتجات بحسب كلمات أسمائها
const NEEDS = [
  { name: "Anti-Aging", icon: "flower-2", word: "aging" },
    { name: "Hydration", icon: "droplet", word: "moist" },
    { name: "Brightening", icon: "sparkles", word: "bright" },
    { name: "Firming", icon: "waves", word: "firm" }
];

// حفظ بيانات النسخة التجريبية داخل متصفح المستخدم فقط
const loadSaved = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

let countryCode = loadSaved("bys-country", null);
let cart = loadSaved("bys-cart", {});
let favorites = loadSaved("bys-favorites", []);
let currentView = "home";
let activeFilter = "All";
let searchTerm = "";
let toastTimeout;

const $ = (selector) => document.querySelector(selector);
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// منع إدخال HTML من أسماء المنتجات داخل الصفحة
function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

// سعر المنتج حسب الدولة المختارة، بدون أي تحويل للعملة
function priceOf(product) {
    const value = product.prices?.[countryCode];
    return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function formatPrice(product) {
    const price = priceOf(product);
    if (price === null) return "Price coming soon";
    const currency = COUNTRIES.find((c) => c.code === countryCode)?.currency || "USD";
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: currency, maximumFractionDigits: currency === "KWD" ? 3 : 2
    }).format(price);
}

// معرفة تصنيف المنتج من اسمه (توزيع مبدئي قابل للتعديل)
function categoryOf(product) {
    // اعتماد القسم المكتوب في catalog.js بدلاً من تخمينه من الاسم
    if (CATEGORIES.some((category) => category.name === product.category)) {
        return product.category;
    }

    // توافق مع المنتجات القديمة التي لا تحتوي على category
    const name = String(product.name || "").toLowerCase();
    return CATEGORIES.find((category) =>
        category.words.some((word) => name.includes(word))
    )?.name || "Skincare";
}

// صورة كل منتج: المستخدم يستبدل الصورة الحقيقية بنفس اسم الكود
function imageOf(product) {
    // استخدام مسار الصورة الذي تختارينه لكل منتج في catalog.js
    return product.image || ("images/products/" + encodeURIComponent(product.id) + ".png");
}

// الصورة البديلة مؤقتة إلى أن تضيف صور المنتجات الحقيقية
function sampleOf(product) {
    const category = categoryOf(product);
    const number = { Skincare: 1, "Body Care": 3, "Hair Care": 2, Perfumes: 2, "Feminine Care": 4, "Bath & Body": 3, "Sun Care": 4, Accessories: 2 }[category] || 1;
    return "images/products/sample-" + number + ".webp";
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2300);
}

// شاشة اختيار البلد، وتظهر أول مرة أو عند تغيير البلد
function showCountryScreen() {
    $("#app").classList.add("hidden");
    $("#countryScreen").classList.remove("hidden");
    $("#countryOptions").innerHTML = COUNTRIES.map((country) => `
        <button class="country-choice" data-country="${country.code}">
            <span class="flag">${country.flag}</span>
            <span>${country.name}</span>
            <span class="arrow">›</span>
        </button>
    `).join("");
}

function selectCountry(code) {
    if (!COUNTRIES.some((country) => country.code === code)) return;
    const changed = countryCode && countryCode !== code;
    countryCode = code;
    save("bys-country", code);
    // تفريغ السلة عند تغيير البلد حتى لا تبقى أسعار البلد السابق
    if (changed) {
        cart = {};
        save("bys-cart", cart);
    }
    $("#countryScreen").classList.add("hidden");
    $("#app").classList.remove("hidden");
    const selected = COUNTRIES.find((country) => country.code === code);
    $("#changeCountry").textContent = `${selected.flag} ${selected.name} ▾`;
    renderAll();
    showView("home");
}

// رسم صورة تصنيف قابلة للضغط
function categoryCard(category) {
    return `<button class="category-item" data-category="${escapeHtml(category.name)}">
        <img src="${category.image}" alt="${escapeHtml(category.name)}" loading="lazy">
        <span>${escapeHtml(category.name)}</span>
    </button>`;
}

// رسم بطاقة المنتج مع المفضلة وزر إضافة السلة
function productCard(product) {
    const available = priceOf(product) !== null;
    const liked = favorites.includes(product.id);
    return `<article class="product-card">
        <div class="product-photo">
            <img src="${imageOf(product)}" data-fallback="${sampleOf(product)}" alt="${escapeHtml(product.name)}" loading="lazy">
            <button class="favorite ${liked ? "saved" : ""}" data-favorite="${escapeHtml(product.id)}" aria-label="Toggle favorite">${liked ? "♥" : "♡"}</button>
        </div>
        <div class="product-body">
            <span class="product-brand">${escapeHtml(product.brand)}</span>
            <button class="product-title" data-product="${escapeHtml(product.id)}">${escapeHtml(product.name)}</button>
            <p class="product-unit">${escapeHtml(product.unit)}</p>
            <div class="product-bottom">
                <span class="${available ? "price" : "unavailable"}">${formatPrice(product)}</span>
                <button class="add-cart" data-add="${escapeHtml(product.id)}" aria-label="Add to cart" ${available ? "" : "disabled"}>+</button>
            </div>
        </div>
    </article>`;
}

function renderHome() {
    $("#homeCategories").innerHTML = CATEGORIES.map(categoryCard).join("");
    $("#allCategories").innerHTML = CATEGORIES.map(categoryCard).join("");
   
$("#needsGrid").innerHTML = NEEDS.map((need) => `
    <button class="need" data-need="${need.word}">
        <i data-lucide="${need.icon}"></i>
        <span>${need.name}</span>
    </button>
`).join("");

if (window.lucide) {
    lucide.createIcons();
}

    // قوائم العرض مؤقتة حتى يحدد المدير الأكثر مبيعاً والجديد فعلاً
    $("#bestProducts").innerHTML = PRODUCTS.slice(0, 4).map(productCard).join("");
    $("#newProducts").innerHTML = PRODUCTS.slice(-4).map(productCard).join("");
    const brands = [...new Set(PRODUCTS.map((product) => product.brand))];
    $("#homeBrands").innerHTML = brands.map((brand) => `<button class="brand-tile" data-brand="${escapeHtml(brand)}">${escapeHtml(brand)}</button>`).join("");
    $("#allBrands").innerHTML = brands.map((brand) => `<button data-brand="${escapeHtml(brand)}">${escapeHtml(brand)}</button>`).join("");
}

function renderProducts() {
    const filters = ["All", ...CATEGORIES.map((category) => category.name)];
    $("#filterBar").innerHTML = filters.map((name) => `
        <button class="${activeFilter === name ? "active" : ""}" data-filter="${escapeHtml(name)}">${escapeHtml(name)}</button>
    `).join("");
    let list = PRODUCTS.filter((product) => {
        const matchesCategory = activeFilter === "All" || categoryOf(product) === activeFilter;
        const matchesSearch = `${product.name} ${product.brand}`.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const sort = $("#sortSelect").value;
    if (sort === "low") list.sort((a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity));
    if (sort === "high") list.sort((a, b) => (priceOf(b) ?? -Infinity) - (priceOf(a) ?? -Infinity));
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    $("#resultCount").textContent = `${list.length} Products`;
    $("#allProducts").innerHTML = list.length ? list.map(productCard).join("") : `<p class="empty">No products found.</p>`;
}

function renderFavorites() {
    const list = PRODUCTS.filter((product) => favorites.includes(product.id));
    $("#favoriteProducts").innerHTML = list.length ? list.map(productCard).join("") : `<p class="empty">Your favorites will appear here ♡</p>`;
}

function renderCart() {
    const items = PRODUCTS.filter((product) => cart[product.id] > 0);
    const count = items.reduce((sum, product) => sum + cart[product.id], 0);
    $("#cartBadge").textContent = count;
    $("#cartBadge").hidden = count === 0;
    $("#cartItems").innerHTML = items.length ? items.map((product) => `
        <div class="cart-row">
            <img src="${imageOf(product)}" data-fallback="${sampleOf(product)}" alt="${escapeHtml(product.name)}">
            <div class="cart-info"><h3>${escapeHtml(product.name)}</h3><strong>${formatPrice(product)}</strong>
                <div class="qty"><button data-qty="${escapeHtml(product.id)}" data-delta="-1">−</button>
                    <span>${cart[product.id]}</span><button data-qty="${escapeHtml(product.id)}" data-delta="1">+</button></div>
            </div>
        </div>`).join("") : `<p class="empty">Your shopping bag is empty.</p>`;
    const total = items.reduce((sum, product) => sum + (priceOf(product) ?? 0) * cart[product.id], 0);
    const currency = COUNTRIES.find((country) => country.code === countryCode)?.currency || "USD";
    const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency }).format(total);
    $("#cartSummary").innerHTML = items.length ? `<div><span>Subtotal</span><span>${formatted}</span></div>
        <p class="small-note">Shipping and payment will be available when checkout is connected.</p>
        <button class="checkout" id="checkoutButton">Checkout — Coming Soon</button>` : "";
}

function renderAll() {
    renderHome();
    renderProducts();
    renderFavorites();
    renderCart();
}

function showView(name) {
    currentView = name;
    document.querySelectorAll(".view").forEach((view) => view.classList.add("hidden"));
    const target = $("#" + name + "View");
    if (!target) return;
    target.classList.remove("hidden");
    document.querySelectorAll(".bottom-nav button").forEach((button) => {
        button.classList.toggle("active", button.dataset.view === name);
    });
    if (name === "products") renderProducts();
    if (name === "cart") renderCart();
    if (name === "favorites") renderFavorites();
    window.scrollTo({ top: 0, behavior: "instant" });
}

function showProduct(id) {
    const product = PRODUCTS.find((item) => item.id === id);
    if (!product) return;
    $("#productDetail").innerHTML = `<div class="product-detail">
        <img src="${imageOf(product)}" data-fallback="${sampleOf(product)}" alt="${escapeHtml(product.name)}">
        <div><p>${escapeHtml(product.brand)}</p><h2>${escapeHtml(product.name)}</h2>
        <p>${escapeHtml(product.unit)}</p><h2 class="price">${formatPrice(product)}</h2>
        <button class="checkout" data-add="${escapeHtml(product.id)}" ${priceOf(product) === null ? "disabled" : ""}>Add to Bag</button></div>
    </div>`;
    showView("product");
}

function addToCart(id) {
    const product = PRODUCTS.find((item) => item.id === id);
    if (!product || priceOf(product) === null) return;
    cart[id] = (cart[id] || 0) + 1;
    save("bys-cart", cart);
    renderCart();
    showToast("Added to your shopping bag");
}

// إدارة النقرات بمستمع واحد، حتى العناصر المضافة ديناميكياً تشتغل
 document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.country) return selectCountry(button.dataset.country);
    if (button.dataset.view) return showView(button.dataset.view);
    if (button.dataset.add) return addToCart(button.dataset.add);
    if (button.dataset.product) return showProduct(button.dataset.product);
    if (button.dataset.favorite) {
        const id = button.dataset.favorite;
        favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
        save("bys-favorites", favorites);
        renderAll();
        return;
    }
    if (button.dataset.qty) {
        const id = button.dataset.qty;
        cart[id] = Math.max(0, (cart[id] || 0) + Number(button.dataset.delta));
        if (!cart[id]) delete cart[id];
        save("bys-cart", cart);
        renderCart();
        return;
    }
    if (button.dataset.category) {
        activeFilter = button.dataset.category;
        searchTerm = "";
        $("#searchInput").value = "";
        $("#productsTitle").textContent = activeFilter;
        return showView("products");
    }
    if (button.dataset.filter) {
        activeFilter = button.dataset.filter;
        $("#productsTitle").textContent = activeFilter === "All" ? "Shop All" : activeFilter;
        return renderProducts();
    }
    if (button.dataset.brand) {
        searchTerm = button.dataset.brand;
        $("#searchInput").value = searchTerm;
        activeFilter = "All";
        $("#productsTitle").textContent = button.dataset.brand;
        return showView("products");
    }
    if (button.dataset.need) {
        searchTerm = button.dataset.need;
        $("#searchInput").value = searchTerm;
        activeFilter = "All";
        $("#productsTitle").textContent = "Beauty Goals";
        return showView("products");
    }
    if (button.id === "changeCountry" || button.id === "accountCountry") return showCountryScreen();
    if (button.id === "clearSearch") {
        $("#searchInput").value = "";
        searchTerm = "";
        renderProducts();
        return;
    }
    if (button.id === "checkoutButton") return showToast("Secure checkout will be available soon");
    if (button.dataset.action === "menu") return showView("categories");
});

// البحث أثناء الكتابة
$("#searchInput").addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    activeFilter = "All";
    $("#clearSearch").hidden = !searchTerm;
    if (searchTerm) {
        $("#productsTitle").textContent = "Search Results";
        showView("products");
    } else if (currentView === "products") {
        renderProducts();
    }
});
$("#sortSelect").addEventListener("change", renderProducts);

// عند غياب صورة المنتج، نعرض صورة مؤقتة من تصميم الواجهة
// عند فشل تحميل صورة، نعرض صورة بديلة إن وجدت
document.addEventListener("error", (event) => {

    const image = event.target;

    // نتأكد أن العنصر صورة
    if (image.tagName !== "IMG") {
        return;
    }

    // إذا فشل تحميل الشعار، نظهر رسالة بالكونسول
    if (image.id === "logoImage") {
        console.error("Logo image not found:", image.src);
        return;
    }

    // عرض صورة مؤقتة إذا صورة المنتج غير موجودة
    if (image.dataset.fallback && !image.dataset.failed) {
        image.dataset.failed = "true";
        image.src = image.dataset.fallback;
    }

}, true);



// صور السلايدر الستة: ضع صورك داخل images/banners بنفس الأسماء
// category لازم يطابق اسم القسم في CATEGORIES فوق
const HERO_BANNERS = [
    { image: "images/banners/slide-1.webp", label: "THE BEAUTY EDIT", title: "Glow <br>Your Skin", description: "Discover your everyday radiance.", category: "Skincare" },
    { image: "images/banners/slide-3.webp", label: "HAIR CARE EDIT", title: "Love Your Hair", description: "Beautiful hair starts with care.", category: "Hair Care" },
    { image: "images/banners/slide-2.webp", label: "SKINCARE ESSENTIALS", title: "Your Daily Ritual", description: "Care that makes you glow.", category: "Skincare" },
   
    { image: "images/banners/slide-4.webp", label: "FRAGRANCE COLLECTION", title: "Your Signature Scent", description: "Find a fragrance to remember.", category: "Perfumes" },
    { image: "images/banners/slide-5.webp", label: "BODY CARE RITUAL", title: "A Little <br> Self Care", description: "Everyday moments of indulgence.", category: "Bath & Body" },
    { image: "images/banners/slide-6.webp", label: "BEAUTY FAVORITES", title: "Beauty <br> Your Way", description: "Explore the finishing touches.", category: "Body Care" }
];

let heroIndex = 0;
let heroTimer = null;
const heroSlider = $("#heroSlider");

// إنشاء الصور والنصوص والنقاط من البيانات السابقة
function createHeroSlider() {
    $("#heroSlides").innerHTML = HERO_BANNERS.map((banner, index) => `
        <article class="hero-slide ${index === 0 ? "is-active" : ""}" aria-hidden="${index !== 0}">
            <img src="${banner.image}" alt="${escapeHtml(banner.category)} collection" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
            <div class="hero-shade"></div>
            <div class="hero-copy">
                <p>${escapeHtml(banner.label)}</p>
                <h1>${escapeHtml(banner.title).replace(/&lt;br\s*\/?&gt;/gi, "<br>")}</h1>
                <span>${escapeHtml(banner.description)}</span>
                <button type="button" data-hero-category="${escapeHtml(banner.category)}" ${index !== 0 ? 'tabindex="-1"' : ''}>Shop Now <b>›</b></button>
            </div>
        </article>
    `).join("");
    $("#heroControls").innerHTML = HERO_BANNERS.map((banner, index) => `
        <button type="button" class="hero-dot ${index === 0 ? "is-active" : ""}" data-slide="${index}" aria-label="Go to slide ${index + 1}" aria-current="${index === 0}"></button>
    `).join("");
    startHeroTimer();
}

// تبديل السلايد مع تحديث النقاط وإمكانية الوصول
function goToHeroSlide(index) {
    heroIndex = (index + HERO_BANNERS.length) % HERO_BANNERS.length;
    document.querySelectorAll(".hero-slide").forEach((slide, i) => {
        const active = i === heroIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        slide.querySelector("button").tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll(".hero-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === heroIndex);
        dot.setAttribute("aria-current", String(i === heroIndex));
    });
}

// الانتقال كل خمس ثوانٍ، والتوقف عند مرور الماوس أو خروج الصفحة
function stopHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = null;
}
function startHeroTimer() {
    stopHeroTimer();
    if (document.hidden) return;
    heroTimer = setInterval(() => {
        if (currentView === "home" && !$("#app").classList.contains("hidden")) {
            goToHeroSlide(heroIndex + 1);
        }
    }, 3000);
}

// Keep autoplay running while the pointer is over the banner.



document.addEventListener("visibilitychange", () => document.hidden ? stopHeroTimer() : startHeroTimer());

// أزرار السلايدر تنقلك مباشرة للقسم الصحيح
heroSlider.addEventListener("click", (event) => {
    const categoryButton = event.target.closest("[data-hero-category]");
    if (categoryButton) {
        activeFilter = categoryButton.dataset.heroCategory;
        searchTerm = "";
        $("#searchInput").value = "";
        $("#productsTitle").textContent = activeFilter;
        showView("products");
        return;
    }
    const dot = event.target.closest("[data-slide]");
    if (dot) goToHeroSlide(Number(dot.dataset.slide));
    if (event.target.closest("#heroPrev")) goToHeroSlide(heroIndex - 1);
    if (event.target.closest("#heroNext")) goToHeroSlide(heroIndex + 1);
    startHeroTimer();
});

// دعم السحب بالإصبع على الموبايل
let heroTouchX = null;
heroSlider.addEventListener("touchstart", (event) => {
    heroTouchX = event.changedTouches[0].clientX;
    stopHeroTimer();
}, { passive: true });
heroSlider.addEventListener("touchend", (event) => {
    if (heroTouchX !== null) {
        const distance = event.changedTouches[0].clientX - heroTouchX;
        if (Math.abs(distance) > 45) goToHeroSlide(heroIndex + (distance < 0 ? 1 : -1));
    }
    heroTouchX = null;
    startHeroTimer();
}, { passive: true });
createHeroSlider();

// بدء التطبيق
if (countryCode && COUNTRIES.some((country) => country.code === countryCode)) {
    selectCountry(countryCode);
} else {
    showCountryScreen();
}

// تسجيل Service Worker عند استخدام localhost أو HTTPS
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

// تشغيل أيقونات شريط التنقل السفلي
if (window.lucide) {
    lucide.createIcons();
}
