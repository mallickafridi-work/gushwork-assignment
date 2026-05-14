document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const hero = document.querySelector(".hero-fold-v2");

    const heroBottom = hero.offsetTop + hero.offsetHeight;

    window.addEventListener("scroll", () => {
        if (window.scrollY >= heroBottom) {
            header.classList.add("visible");
        } else {
            header.classList.remove("visible");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {

    const img = document.querySelector(".product-image-thumbnail");
    const lens = document.querySelector(".zoom-lens");
    const zoomWindow = document.querySelector(".zoom-window");

    const zoomLevel = 3;

    img.addEventListener("mouseenter", () => {

        const rect = img.getBoundingClientRect();

        zoomWindow.style.display = "block";
        lens.style.display = "block";

        zoomWindow.style.backgroundImage = `url(${img.src})`;

        zoomWindow.style.backgroundSize =
            img.width * zoomLevel + "px " +
            img.height * zoomLevel + "px";

        zoomWindow.style.left = rect.right + 20 + window.scrollX + "px";
        zoomWindow.style.top = rect.top + 100 + window.scrollY + "px";

    });

    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);

    function moveLens(e) {

        const rect = img.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        x = x - lens.offsetWidth / 2;
        y = y - lens.offsetHeight / 2;

        if (x < 0) x = 0;
        if (y < 0) y = 0;

        if (x > img.width - lens.offsetWidth)
            x = img.width - lens.offsetWidth;

        if (y > img.height - lens.offsetHeight)
            y = img.height - lens.offsetHeight;

        lens.style.left = x + "px";
        lens.style.top = y + "px";

        const fx = x * zoomLevel;
        const fy = y * zoomLevel;

        zoomWindow.style.backgroundPosition = `-${fx}px -${fy}px`;

    }

    img.addEventListener("mouseleave", () => {

        zoomWindow.style.display = "none";
        lens.style.display = "none";

    });

});