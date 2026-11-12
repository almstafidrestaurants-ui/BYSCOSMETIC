(() => {
    const screen = document.getElementById("openingScreen");
    const image = document.getElementById("openingImage");
    const imageCount = 10;
    const displayDuration = 5000;
    const storageKey = "bys-last-opening-image";
    let index = Math.floor(Math.random() * imageCount);

    try {
        const previous = Number.parseInt(localStorage.getItem(storageKey), 10);
        if (previous >= 0 && previous < imageCount) {
            index = (previous + 1) % imageCount;
        }
        localStorage.setItem(storageKey, String(index));
    } catch {
        // A random image is available even when browser storage is blocked.
    }

    const skip = document.getElementById("openingSkip");
    const countdown = document.getElementById("openingCountdown");
    let timer;
    let loadTimeout;

    function finish() {
        clearInterval(timer);
        clearTimeout(loadTimeout);
        if (screen.open) screen.close();
    }

    screen.addEventListener("cancel", event => {
        event.preventDefault();
        finish();
    });
    skip.addEventListener("click", finish);
    screen.showModal();

    loadTimeout = setTimeout(finish, 10000);
    image.addEventListener("load", () => {
        if (!screen.open) return;
        clearTimeout(loadTimeout);
        const end = performance.now() + displayDuration;
        timer = setInterval(() => {
            const seconds = Math.max(0, Math.ceil((end - performance.now()) / 1000));
            countdown.textContent = String(seconds);
            if (seconds === 0) finish();
        }, 100);
    }, { once: true });
    image.addEventListener("error", finish, { once: true });

    image.src = `images/opening/opening-${String(index + 1).padStart(2, "0")}.webp`;
})();
