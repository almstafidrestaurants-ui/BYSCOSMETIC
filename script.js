// بيانات الدول - كل دولة سعرها مستقل من catalog.js
const STORE_COUNTRIES = [
    { code: "LB", name: "Lebanon", flag: "🇱🇧", currency: "USD", dial: "+961" },
    { code: "SY", name: "Syria", flag: "🇸🇾", currency: "SYP", dial: "+963" },
    { code: "JO", name: "Jordan", flag: "🇯🇴", currency: "JOD", dial: "+962" },
    { code: "KW", name: "Kuwait", flag: "🇰🇼", currency: "KWD", dial: "+965" },
    { code: "EG", name: "Egypt", flag: "🇪🇬", currency: "EGP", dial: "+20" }
];

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const COUNTRY_DIAL_GROUPS = `1 US CA AG AI AS BB BM BS DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI
7 KZ RU
20 EG
27 ZA
30 GR
31 NL
32 BE
33 FR
34 ES
36 HU
39 IT VA
40 RO
41 CH
43 AT
44 GB GG IM JE
45 DK
46 SE
47 NO SJ
48 PL
49 DE
51 PE
52 MX
53 CU
54 AR
55 BR
56 CL
57 CO
58 VE
60 MY
61 AU CC CX
62 ID
63 PH
64 NZ
65 SG
66 TH
81 JP
82 KR
84 VN
86 CN
90 TR
91 IN
92 PK
93 AF
94 LK
95 MM
98 IR
211 SS
212 MA EH
213 DZ
216 TN
218 LY
220 GM
221 SN
222 MR
223 ML
224 GN
225 CI
226 BF
227 NE
228 TG
229 BJ
230 MU
231 LR
232 SL
233 GH
234 NG
235 TD
236 CF
237 CM
238 CV
239 ST
240 GQ
241 GA
242 CG
243 CD
244 AO
245 GW
246 IO
247 AC
248 SC
249 SD
250 RW
251 ET
252 SO
253 DJ
254 KE
255 TZ
256 UG
257 BI
258 MZ
260 ZM
261 MG
262 RE YT
263 ZW
264 NA
265 MW
266 LS
267 BW
268 SZ
269 KM
290 SH TA
291 ER
297 AW
298 FO
299 GL
350 GI
351 PT
352 LU
353 IE
354 IS
355 AL
356 MT
357 CY
358 FI AX
359 BG
370 LT
371 LV
372 EE
373 MD
374 AM
375 BY
376 AD
377 MC
378 SM
380 UA
381 RS
382 ME
383 XK
385 HR
386 SI
387 BA
389 MK
420 CZ
421 SK
423 LI
500 FK
501 BZ
502 GT
503 SV
504 HN
505 NI
506 CR
507 PA
508 PM
509 HT
590 GP BL MF
591 BO
592 GY
593 EC
594 GF
595 PY
596 MQ
597 SR
598 UY
599 BQ CW
670 TL
672 NF
673 BN
674 NR
675 PG
676 TO
677 SB
678 VU
679 FJ
680 PW
681 WF
682 CK
683 NU
685 WS
686 KI
687 NC
688 TV
689 PF
690 TK
691 FM
692 MH
850 KP
852 HK
853 MO
855 KH
856 LA
880 BD
886 TW
960 MV
961 LB
962 JO
963 SY
964 IQ
965 KW
966 SA
967 YE
968 OM
970 PS
971 AE
972 IL
973 BH
974 QA
975 BT
976 MN
977 NP
992 TJ
993 TM
994 AZ
995 GE
996 KG
998 UZ`;
const COUNTRIES = COUNTRY_DIAL_GROUPS.split("\n").flatMap(group => {
    const [dial, ...codes] = group.split(" ");
    return codes.map(code => STORE_COUNTRIES.find(country => country.code === code) || {
        code,
        name: countryNames.of(code),
        flag: String.fromCodePoint(...Array.from(code, letter => 127397 + letter.charCodeAt(0))),
        dial: "+" + dial
    });
}).sort((first, second) => first.name.localeCompare(second.name));

// التصنيفات - يمكنك تغيير صورة كل تصنيف من المجلد images/categories
const CATEGORIES = [
    { name: "Skincare", image: "images/categories/glow-skin.png", words: ["face", "serum", "cream", "toner", "cleanser", "eye", "collagen", "niacinamide", "vitamin c", "skin"] },
    { name: "Body Care", image: "images/categories/bbl-weight-gain.png", words: ["body", "cellulite", "stretch", "butter", "hand", "foot", "firming"] },
    { name: "Hair Care", image: "images/categories/hair-nails.png", words: ["hair", "shampoo", "conditioner", "scalp"] },
    { name: "Perfumes", image: "images/categories/mens-performance.png", words: ["perfume", "fragrance", "splash", "eau de"] },
    { name: "Feminine Care", image: "images/categories/feminine-care-libido.png", words: ["intimate", "feminine", "vaginal"] },
    { name: "Bath & Body", image: "images/categories/flat-tummy-weight-loss-detox.png", words: ["bath", "soap", "loofah", "scrub", "moroccan"] },
    { name: "Sun Care", image: "images/categories/vitamins-wellness.png", words: ["sun", "spf", "sunscreen"] },
    { name: "Accessories", image: "images/categories/gym-fitness.png", words: ["accessor", "brush", "loofah"] }
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

const savedCountry = loadSaved("bys-country", null);
let countryCode = COUNTRIES.some(country => country.code === savedCountry) ? savedCountry : "LB";
let cart = loadSaved("bys-cart", {});
let favorites = loadSaved("bys-favorites", []);
let currentView = "home";
let activeFilter = "All";
let searchTerm = "";
let toastTimeout;
let cartFeedbackTimeout;

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

function cardImageOf(originalImage) {
    return originalImage.replace(/^images\/products\/([^/]+\.webp)$/, "images/products/card/$1");
}

// الصورة البديلة مؤقتة إلى أن تضيف صور المنتجات الحقيقية
function sampleOf(product) {
    const category = categoryOf(product);
    const number = { Skincare: 1, "Body Care": 3, "Hair Care": 2, Perfumes: 2, "Feminine Care": 4, "Bath & Body": 3, "Sun Care": 4, Accessories: 2 }[category] || 1;
    return "images/products/placeholder.webp";
}

function isValidPhone(phone, country) {
    const number = String(phone || "").replace(/\D/g, "");
    // National numbers, without the international dial prefix.
    const patterns = {
        LB: /^(?:0?[13789]\d{6}|0?[3467]\d{7})$/, // Lebanon: 7 or 8 digits depending on prefix
        SY: /^0?9\d{8}$/, // Syria mobile
        JO: /^0?7[789]\d{7}$/, // Jordan mobile
        KW: /^[569]\d{7}$/, // Kuwait mobile
        EG: /^0?1[0125]\d{8}$/ // Egypt mobile
    };
    const dial = COUNTRIES.find(entry => entry.code === country)?.dial;
    if (!dial || /^(\d)\1+$/.test(number)) return false;
    const pattern = patterns[country] || new RegExp(`^\\d{4,${16 - dial.length}}$`);
    return pattern.test(number);
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2300);
}

// صور المنتجات تتحرك بأربعة صفوف بشكل مستمر بشاشة الترحيب
function renderWelcomeShowcase() {
    const source = PRODUCTS.filter((product) => product.image);
    const chosen = source.length ? source : PRODUCTS;
    // تقسيم صور المنتجات على أربعة صفوف متحركة
    const tiles = chosen.slice(0, 20);
    const renderTile = (product) => `
        <div class="welcome-product-tile">
            <img src="${escapeHtml(cardImageOf(imageOf(product)))}"
                 data-fallback="${escapeHtml(imageOf(product))}"
                 alt="${escapeHtml(product.name)}" loading="lazy" decoding="async" fetchpriority="low">
        </div>`;
    const rows = [[], [], [], []];
    tiles.forEach((product, index) => rows[index % 4].push(product));
    ["#welcomeTrackOne", "#welcomeTrackTwo", "#welcomeTrackThree", "#welcomeTrackFour"].forEach((selector, index) => {
        const items = rows[index].map(renderTile).join("");
        // تكرار المجموعة يضمن حركة متواصلة بدون فراغات
        $(selector).innerHTML = `<div class="welcome-marquee-set">${items}</div><div class="welcome-marquee-set" aria-hidden="true">${items}</div>`;
    });
}

// تحديث علم البلد ورمز الاتصال فور تغيير القائمة
function updateWelcomeCountry(code) {
    const selected = COUNTRIES.find((country) => country.code === code) || STORE_COUNTRIES[0];
    $("#welcomeFlag").textContent = selected.flag;
    $("#welcomeDial").textContent = selected.dial;
    $("#welcomeCountry").value = selected.code;
    $("#welcomeCountryName").textContent = selected.name;
}

// شاشة الدخول تظهر أول زيارة، أو عند طلب تغيير البلد من المتجر
function showCountryScreen() {
    $("#app").classList.add("hidden");
    $("#countryScreen").classList.remove("hidden");
    $("#roleScreen").classList.add("hidden");
    updateWelcomeCountry(countryCode || "LB");
}

// حفظ اختيار المستخدم محلياً على نفس الجهاز
const ROLE_KEY = "bys-user-role";
let selectedRole = null;
let userRole = loadSaved(ROLE_KEY, null);

function showRoleScreen() {
    $("#countryScreen").classList.add("hidden");
    $("#app").classList.add("hidden");
    $("#roleScreen").classList.remove("hidden");
    selectedRole = null;
    document.querySelectorAll("[data-select-role]").forEach(button => button.classList.remove("selected"));
    $("#roleContinue").disabled = true;
    if (window.lucide) lucide.createIcons();
}

document.querySelectorAll("[data-select-role]").forEach(button => {
    button.addEventListener("click", () => {
        selectedRole = button.dataset.selectRole;
        document.querySelectorAll("[data-select-role]").forEach(item => {
            item.classList.toggle("selected", item === button);
            item.setAttribute("aria-pressed", String(item === button));
        });
        $("#roleContinue").disabled = false;
    });
});

$("#roleContinue").addEventListener("click", () => {
    if (!selectedRole) return;
    userRole = selectedRole;
    save(ROLE_KEY, userRole);
    $("#roleScreen").classList.add("hidden");
    $("#app").classList.remove("hidden");
    showView("home");
});

function selectCountry(code) {
    if (!COUNTRIES.some((country) => country.code === code)) return;
    const changed = countryCode && countryCode !== code;
    countryCode = code;
    save("bys-country", code);
    // تفريغ السلة عند تغيير البلد لأن الأسعار تختلف
    if (changed) {
        cart = {};
        save("bys-cart", cart);
    }
    $("#countryScreen").classList.add("hidden");
    $("#roleScreen").classList.add("hidden");
    $("#app").classList.remove("hidden");
    const selected = COUNTRIES.find((country) => country.code === code);
    $("#changeCountry").textContent = `${selected.flag} ${selected.name} ▾`;
    renderAll();
    if (userRole === "customer" || userRole === "consultant") {
        showView("home");
    } else {
        showRoleScreen();
    }
}




const countryPicker = $("#countryPicker");
const countrySearch = $("#countrySearch");
const countryResults = $("#countryResults");
const arabicCountryNames = new Intl.DisplayNames(["ar"], { type: "region" });

function renderCountryResults() {
    const query = countrySearch.value.trim().toLowerCase()
        .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632))
        .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776));
    const dialQuery = query.replace(/^00/, "+").replace(/\s/g, "");
    const matches = COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(query) ||
        arabicCountryNames.of(country.code).includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dial.startsWith(dialQuery.startsWith("+") ? dialQuery : "+" + dialQuery)
    );
    countryResults.innerHTML = matches.map(country => `
        <button type="button" data-pick-country="${country.code}">
            <span>${country.flag} ${escapeHtml(country.name)}</span><small>${country.code} · ${country.dial}</small>
        </button>`).join("") || '<p role="status">No countries found.</p>';
    countryResults.scrollTop = 0;
}

$("#openCountryPicker").addEventListener("click", () => {
    countrySearch.value = "";
    renderCountryResults();
    countryPicker.showModal();
});
$("#closeCountryPicker").addEventListener("click", () => countryPicker.close());
countrySearch.addEventListener("input", renderCountryResults);
countryResults.addEventListener("click", event => {
    const option = event.target.closest("[data-pick-country]");
    if (!option) return;
    updateWelcomeCountry(option.dataset.pickCountry);
    countryPicker.close();
});

// استرجاع رقم الهاتف المحفوظ
$("#welcomePhone").value = loadSaved("bys-phone-local", "");

$("#welcomePhone").addEventListener("input", () => {
    const error = document.querySelector("#phoneError");
    if (error) error.remove();
});

// عند الضغط على Continue
$("#welcomeForm").addEventListener("submit", (event) => {

    event.preventDefault();

    const code = $("#welcomeCountry").value;
    const phone = $("#welcomePhone").value.trim();

    // التحقق من الرقم قبل المتابعة
 
if (!isValidPhone(phone, code)) {
    let error = document.querySelector("#phoneError");

    // إنشاء رسالة الخطأ تحت رقم الهاتف
    if (!error) {
        error = document.createElement("p");
        error.id = "phoneError";
        $("#welcomePhone").insertAdjacentElement("afterend", error);
    }

    error.textContent = "Please enter a valid phone number.";
    error.style.color = "#e53935";
    error.style.fontSize = "12px";
    error.style.marginTop = "6px";

    return;
}

// إخفاء الخطأ لما يكون الرقم صحيح
const error = document.querySelector("#phoneError");
if (error) error.remove();


    // حفظ الرقم ورمز الاتصال
    save("bys-phone-local", phone);
    save(
        "bys-phone-dial",
        COUNTRIES.find((country) => country.code === code).dial
    );

    // الانتقال للمرحلة التالية
    selectCountry(code);
});

// تشغيل صور المنتجات المتحركة
renderWelcomeShowcase();


// رسم صورة تصنيف قابلة للضغط
function categoryCard(category) {
    return `<button class="category-item" data-category="${escapeHtml(category.name)}">
        <img src="${category.image}" alt="${escapeHtml(category.name)}" loading="lazy" decoding="async">
        <span>${escapeHtml(category.name)}</span>
    </button>`;
}

// رسم بطاقة المنتج مع المفضلة وزر إضافة السلة
function productCard(product, showcase = false) {
    const available = priceOf(product) !== null;
    const liked = favorites.includes(product.id);
    const unit = product.unit?.trim();
    const originalImage = imageOf(product);
    const cardImage = cardImageOf(originalImage);
    return `<article class="product-card ${showcase ? "showcase-card" : ""}">
        <div class="product-photo">
            <button type="button" class="product-image-link" data-product="${escapeHtml(product.id)}" aria-label="View details for ${escapeHtml(product.name.trim())}">
                <img src="${escapeHtml(cardImage)}" data-fallback="${escapeHtml(cardImage === originalImage ? sampleOf(product) : originalImage)}" alt="" loading="lazy" decoding="async" fetchpriority="low">
            </button>
            <button class="favorite ${liked ? "saved" : ""}" data-favorite="${escapeHtml(product.id)}" aria-label="Toggle favorite">${liked ? "♥" : "♡"}</button>
        </div>
        <div class="product-body">
            <span class="product-brand">${escapeHtml(product.brand)}</span>
            <div class="product-title">${escapeHtml(product.name)}</div>
            ${unit ? `<p class="product-unit">${escapeHtml(unit)}</p>` : ""}
            <div class="product-bottom">
                <span class="${available ? "price" : "unavailable"}">${formatPrice(product)}</span>
                <button class="add-cart" data-add="${escapeHtml(product.id)}" aria-label="Add to cart" ${available ? "" : "disabled"}>${showcase ? '<span class="cart-mini-icon" aria-hidden="true">🛒</span><span>Add to cart</span>' : '<span class="bys-plus-symbol" aria-hidden="true">+</span>'}</button>
            </div>
        </div>
    </article>`;
}

function renderHome() {
    $("#homeCategories").innerHTML = CATEGORIES.map(category => category.name === "Skincare" ? `
        <button type="button" class="category-item all-categories-item home-categories-link" data-view="categories">
            <img src="images/ui/all-categories.svg" alt="" width="80" height="80">
            <span>All Categories</span>
        </button>` : categoryCard(category)).join("");
    $("#allCategories").innerHTML = `
        <button type="button" class="category-item all-categories-item" data-category="All">
            <img src="images/ui/all-categories.svg" alt="" width="80" height="80">
            <span>All Categories</span>
        </button>` + CATEGORIES.map(categoryCard).join("");
   
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
    $("#bestProducts").innerHTML = PRODUCTS.slice(0, 8).map((product) => productCard(product, true)).join("");
    $("#newProducts").innerHTML = PRODUCTS.slice(-8).map((product) => productCard(product, true)).join("");
    $("#categoryShowcases").innerHTML = CATEGORIES.map(category => {
        const products = PRODUCTS.filter(product => categoryOf(product) === category.name).slice(0, 8);
        if (!products.length) return "";
        return `<section class="category-showcase"><div class="section-heading"><h2>${escapeHtml(category.name)}</h2><button data-category="${escapeHtml(category.name)}">View All <span>›</span></button></div><div class="product-grid home-products">${products.map(product => productCard(product, true)).join("")}</div></section>`;
    }).join("");
    const brands = [...new Set(PRODUCTS.map((product) => product.brand))];
    $("#homeBrands").innerHTML = brands.map((brand) => {
        // Show a clean typographic brand mark until the verified official logo is supplied.
        return `<button class="brand-tile" data-brand="${escapeHtml(brand)}" aria-label="Shop ${escapeHtml(brand)}">
            <span class="brand-wordmark">${escapeHtml(brand)}</span>
        </button>`;
    }).join("");
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

function updateFavoritesBadge() {
    const badge = $("#favoritesBadge");
    if (!badge) return;
    const count = new Set(favorites).size;
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.hidden = count === 0;
    const navBadge = $("#favoritesNavBadge");
    if (navBadge) {
        navBadge.textContent = count > 99 ? "99+" : String(count);
        navBadge.hidden = count === 0;
    }
}

function renderFavorites() {
    updateFavoritesBadge();
    const list = PRODUCTS.filter((product) => favorites.includes(product.id));
    $("#favoriteProducts").innerHTML = list.length ? list.map(productCard).join("") : `<p class="empty">Your favorites will appear here ♡</p>`;
}

// Consultant discounts: tier is based on the full cart subtotal before discounts.
// Magic Aura and Loreve items always receive 15% instead of the tier rate.
function isSpecialConsultantBrand(product) {
    const brand = String(product.brand || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]/g, "");
    return brand === "magicaura" || brand === "loreve";
}
function consultantCartPricing(items) {
    const subtotal = items.reduce((sum, product) => sum + (priceOf(product) ?? 0) * cart[product.id], 0);
    const consultant = userRole === "consultant" && countryCode === "LB";
    const tierRate = subtotal >= 75 ? 0.30 : subtotal >= 50 ? 0.25 : 0.20;
    const discount = consultant ? items.reduce((sum, product) => {
        const rate = isSpecialConsultantBrand(product) ? 0.15 : tierRate;
        return sum + (priceOf(product) ?? 0) * cart[product.id] * rate;
    }, 0) : 0;
    return { subtotal, discount, total: Math.max(0, subtotal - discount), tierRate, consultant };
}

function renderCart() {
    const items = PRODUCTS.filter((product) => cart[product.id] > 0);
    const count = items.reduce((sum, product) => sum + cart[product.id], 0);
    $("#cartBadge").textContent = count;
    $("#cartBadge").hidden = count === 0;
    updateCartFeedbackBar();
    $("#cartItems").innerHTML = items.length ? items.map((product) => `
        <div class="cart-row">
            <img src="${imageOf(product)}" data-fallback="${sampleOf(product)}" alt="${escapeHtml(product.name)}">
            <div class="cart-info"><h3>${escapeHtml(product.name)}</h3><strong>${formatPrice(product)}</strong>
                <div class="qty"><button data-qty="${escapeHtml(product.id)}" data-delta="-1">−</button>
                    <span>${cart[product.id]}</span><button data-qty="${escapeHtml(product.id)}" data-delta="1">+</button></div>
            </div>
        </div>`).join("") : `<p class="empty">Your shopping bag is empty.</p>`;
    const pricing = consultantCartPricing(items);
    const currency = COUNTRIES.find((country) => country.code === countryCode)?.currency || "USD";
    const money = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
    const discountDetails = pricing.consultant ? `
        <div class="consultant-discount-line"><span>Consultant discounts</span><strong>−${money(pricing.discount)}</strong></div>
        <div class="consultant-total-line"><span>Total</span><strong>${money(pricing.total)}</strong></div>` :
        `<div class="consultant-total-line"><strong>Total</strong><strong>${money(pricing.total)}</strong></div>`;
    $("#cartSummary").innerHTML = items.length ? `<div><span>Subtotal</span><span>${money(pricing.subtotal)}</span></div>${discountDetails}
        <p class="small-note">Complete your account before checkout.</p>
        <button class="checkout" id="checkoutButton">Continue to payment</button>
        <div id="paymentOptions" class="payment-options" hidden>
          <h3>Choose payment method</h3>
          <p class="payment-intro">Select how you would like to pay.</p>
          <div class="payment-method-list" role="group" aria-label="Payment methods">
            <button class="payment-method" data-payment="Visa" type="button"><span class="payment-mark">VISA</span><span class="payment-label">Visa / Card<small>Secure card checkout</small></span><span class="payment-chevron">›</span></button>
            <button class="payment-method" data-payment="Whish" type="button"><span class="payment-mark">W</span><span class="payment-label">Whish<small>Manual transfer</small></span><span class="payment-chevron">›</span></button>
            <button class="payment-method" data-payment="PayPal" type="button"><span class="payment-mark">P</span><span class="payment-label">PayPal<small>Pay using PayPal</small></span><span class="payment-chevron">›</span></button>
          </div>
          <div id="paymentSelection" class="payment-selection" role="status" aria-live="polite" hidden></div>
          <p class="payment-security-note">Whish is a manual transfer. Orders are not marked paid automatically. Visa and PayPal are not connected.</p>
        </div>` : "";
}


// Customer details are local-only until a secure backend is connected.
function normalizeNationalPhone(value, code) {
    let digits = String(value || "").replace(/\D/g, "");
    const dial = (COUNTRIES.find(c => c.code === code)?.dial || "").replace(/\D/g, "");
    const input = String(value || "").trim();
    if (dial && input.startsWith("+") && digits.startsWith(dial)) digits = digits.slice(dial.length);
    else if (dial && input.startsWith("00") && digits.startsWith("00" + dial)) digits = digits.slice(dial.length + 2);
    return digits;
}
const PHONE_HINTS = {LB:"03 123 456 or 71 123 456", SY:"9XXXXXXXX", JO:"7XXXXXXXX", KW:"5XXXXXXX", EG:"1XXXXXXXXX"};
const PROFILE_KEY = "bys-customer-profile";
// Remember when the account form was opened from checkout.
let returnToCheckoutAfterProfile = false;
function getCustomerProfile() { return loadSaved(PROFILE_KEY, {}); }
function profileIsComplete(profile = getCustomerProfile()) {
    const phone = normalizeNationalPhone(profile.phone, countryCode);
    return String(profile.fullName || "").trim().length >= 3 &&
      isValidPhone(phone, countryCode) && String(profile.address || "").trim().length >= 8 &&
      String(profile.occupation || "").trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(profile.email || "").trim()) &&
      profile.country === countryCode;
}
function fillCustomerProfile() {
    const form = document.getElementById("customerProfileForm");
    const profile = getCustomerProfile();
    const dial = COUNTRIES.find(c => c.code === countryCode)?.dial || "+961";
    document.getElementById("profileDial").textContent = dial;
    form.elements.namedItem("phone").placeholder = "Enter your phone number";
    for (const field of ["fullName", "phone", "address", "location", "occupation", "email"]) {
        form.elements.namedItem(field).value = profile[field] || "";
    }
    document.getElementById("profileError").hidden = true;
}
document.getElementById("customerProfileForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const profile = Object.fromEntries(new FormData(form).entries());
    profile.phone = normalizeNationalPhone(profile.phone, countryCode);
    profile.country = countryCode;
    const error = document.getElementById("profileError");
    if (!profileIsComplete(profile)) {
        error.textContent = "Please enter a valid full name, phone number for your selected country, address, occupation, and email.";
        error.hidden = false;
        return;
    }
    error.hidden = true;
    save(PROFILE_KEY, profile);
    showToast("Account details saved ✓");
    if (returnToCheckoutAfterProfile) {
        returnToCheckoutAfterProfile = false;
        showView("cart");
        const paymentOptions = document.getElementById("paymentOptions");
        if (paymentOptions) {
            paymentOptions.hidden = false;
            paymentOptions.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    } else if (currentView === "cart") {
        renderCart();
    }
});

document.getElementById("useCurrentLocation").addEventListener("click", () => {
    const button = document.getElementById("useCurrentLocation");
    const status = document.getElementById("locationStatus");
    if (!navigator.geolocation || !window.isSecureContext) {
        status.textContent = "Location needs HTTPS (or localhost) and a supported browser.";
        return;
    }
    button.disabled = true;
    status.textContent = "Getting your location… Please allow location access.";
    navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        document.getElementById("profileLocation").value = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        status.textContent = "Location added. Save your account to keep it.";
        button.disabled = false;
    }, error => {
        status.textContent = error.code === 1 ? "Location permission was denied. You can enter it manually." : "Couldn't get your location. Try again or enter it manually.";
        button.disabled = false;
    }, {enableHighAccuracy: true, timeout: 12000, maximumAge: 60000});
});

function renderAll() {
    renderHome();
    renderProducts();
    renderFavorites();
    renderCart();
}

// Browser/Android back button follows the shop's internal pages.
// Keep the original URL unchanged (GitHub Pages compatible).
const BYS_HISTORY_KEY = "bysShopView";
try { history.replaceState({ ...(history.state || {}), [BYS_HISTORY_KEY]: "home" }, "", location.href); } catch (_) {}
window.addEventListener("popstate", (event) => {
    const destination = event.state && event.state[BYS_HISTORY_KEY];
    showView(destination && document.getElementById(destination + "View") ? destination : "home", false);
});

function showView(name, addHistory = true) {
    if (!document.getElementById(name + "View")) return;
    if (returnToCheckoutAfterProfile && name !== "account" && name !== "cart") returnToCheckoutAfterProfile = false;
    if (addHistory && name !== currentView) {
        try { history.pushState({ [BYS_HISTORY_KEY]: name }, "", location.href); } catch (_) {}
    }
    currentView = name;
    document.body.classList.toggle("bys-settings-open", name === "settings");
    document.body.classList.toggle("bys-cart-open", name === "cart");
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
    if (name === "account") fillCustomerProfile();
    if (window.lucide) lucide.createIcons();
    window.scrollTo({ top: 0, behavior: "instant" });
}

function showProduct(id) {
    const product = PRODUCTS.find((item) => item.id === id);
    if (!product) return;
    $("#productDetail").innerHTML = `<div class="product-detail">
        <img src="${imageOf(product)}" data-fallback="${sampleOf(product)}" alt="${escapeHtml(product.name)}" decoding="async" fetchpriority="high">
        <div><p>${escapeHtml(product.brand)}</p><h2>${escapeHtml(product.name)}</h2>
        <p class="detail-category">${escapeHtml(categoryOf(product))}</p>
        ${product.unit?.trim() ? `<p class="product-unit">${escapeHtml(product.unit.trim())}</p>` : ""}
        <p class="price">${formatPrice(product)}</p>
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
    showCartFeedback();
}

// شريط السلة ثابت ما دامت السلة فيها منتجات؛ رسالة النجاح مؤقتة فقط.
function updateCartFeedbackBar() {
    const feedback = document.getElementById("cartFeedback");
    if (!feedback) return;
    const items = PRODUCTS.filter(product => cart[product.id] > 0);
    const count = items.reduce((total, product) => total + cart[product.id], 0);
    feedback.classList.toggle("visible", count > 0);
    document.getElementById("cartFeedbackCount").textContent = `${count} ${count === 1 ? "item" : "items"}`;
    document.getElementById("cartFeedbackImages").innerHTML = items.slice(-2).map(product =>
        `<img src="${escapeHtml(imageOf(product))}" alt="" loading="lazy" onerror="this.onerror=null;this.src='images/products/placeholder.webp'">`
    ).join("");
    if (!count) {
        clearTimeout(cartFeedbackTimeout);
        feedback.classList.remove("show-success");
    }
}
function showCartFeedback() {
    const feedback = document.getElementById("cartFeedback");
    if (!feedback) return;
    updateCartFeedbackBar();
    feedback.classList.remove("show-success");
    void feedback.offsetWidth;
    feedback.classList.add("show-success");
    clearTimeout(cartFeedbackTimeout);
    cartFeedbackTimeout = setTimeout(() => feedback.classList.remove("show-success"), 2300);
}

// إدارة النقرات بمستمع واحد، حتى العناصر المضافة ديناميكياً تشتغل
 document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button?.dataset.product) return showProduct(button.dataset.product);
    if (!button) return;
    if (button.dataset.country) return selectCountry(button.dataset.country);
    if (button.dataset.view) {
        return showView(button.dataset.view);
    }
    if (button.dataset.add) return addToCart(button.dataset.add);
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
        $("#productsTitle").textContent = activeFilter === "All" ? "Shop All" : activeFilter;
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
    if (button.id === "checkoutButton") {
        if (!profileIsComplete()) {
            returnToCheckoutAfterProfile = true;
            showToast("Complete your account information first");
            return showView("account");
        }
        document.getElementById("paymentOptions").hidden = false;
        document.getElementById("paymentOptions").scrollIntoView({behavior:"smooth", block:"nearest"});
        return;
    }
    if (button.dataset.copyWhish) {
        const number = button.dataset.copyWhish;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(number).then(() => showToast("Whish number copied")).catch(() => showToast("Number: " + number));
        } else {
            showToast("Whish number: " + number);
        }
        return;
    }
    if (button.dataset.payment) {
        const method = button.dataset.payment;
        document.querySelectorAll(".payment-method").forEach(item => {
            const selected = item === button;
            item.classList.toggle("is-selected", selected);
            item.setAttribute("aria-pressed", String(selected));
        });
        const panel = document.getElementById("paymentSelection");
        // Show transfer details directly beneath the selected Whish method.
        button.insertAdjacentElement("afterend", panel);
        panel.hidden = false;
        if (method === "Whish") {
            const items = PRODUCTS.filter(product => cart[product.id] > 0);
            const pricing = consultantCartPricing(items);
            const currency = COUNTRIES.find(c => c.code === countryCode)?.currency || "USD";
            const amount = new Intl.NumberFormat("en-US", {style:"currency", currency}).format(pricing.total);
            panel.innerHTML = `<div class="whish-manual-box">
                <div class="whish-transfer-heading">Whish transfer details</div>
                <span class="whish-transfer-caption">Amount to transfer</span>
                <div class="whish-transfer-amount">${escapeHtml(amount)}</div>
                <span class="whish-transfer-caption">Send to</span>
                <div class="whish-account">Bys Wish Account</div>
                <div class="whish-number" dir="ltr">+961 81 394 916</div>
                <button type="button" class="whish-copy" data-copy-whish="+96181394916">Copy Whish number</button>
                <p class="whish-transfer-help">Open Whish, transfer the exact amount to this number, and keep the receipt.</p>
                <p class="whish-transfer-warning">Manual payment only. The store owner must verify your transfer before confirming your order.</p>
            </div>`;
        } else {
            panel.textContent = method + " is not connected yet. No payment can be made using this option.";
        }
        return;
    }
    if (button.dataset.settings) return showToast(button.dataset.settings + " page is coming soon");
    if (button.dataset.action === "menu") return showView("settings");
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



// بدء التطبيق
const initialCountry = COUNTRIES.find(country => country.code === countryCode);
$("#changeCountry").textContent = `${initialCountry.flag} ${initialCountry.name} ▾`;
$("#app").classList.remove("hidden");
renderAll();
showView("home", false);

// تسجيل Service Worker عند استخدام localhost أو HTTPS
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

// تشغيل أيقونات شريط التنقل السفلي
if (window.lucide) {
    lucide.createIcons();
}
