document.addEventListener("DOMContentLoaded", () => {
    const animovaneSekce = document.querySelectorAll(".reveal");

    const pozorovatel = new IntersectionObserver((zaznamy) => {
        zaznamy.forEach((zaznam) => {
            if (zaznam.isIntersecting) {
                zaznam.target.classList.add("viditelny");
                pozorovatel.unobserve(zaznam.target);
            }
        });
    }, { threshold: 0.15 });

    animovaneSekce.forEach((sekce) => pozorovatel.observe(sekce));

    const obrazky = document.querySelectorAll(".galerie-mrizka img");
    if (obrazky.length === 0) return;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const zvetsenyObrazek = document.createElement("img");
    overlay.appendChild(zvetsenyObrazek);
    document.body.appendChild(overlay);

    obrazky.forEach((img) => {
        img.addEventListener("click", () => {
            zvetsenyObrazek.src = img.src;
            zvetsenyObrazek.alt = img.alt;
            overlay.classList.add("aktivni");
        });
    });

    overlay.addEventListener("click", () => {
        overlay.classList.remove("aktivni");
    });
});
