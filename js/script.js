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

    const obrazky = Array.from(document.querySelectorAll(".galerie-mrizka img"));
    if (obrazky.length === 0) return;

    let aktualniIndex = 0;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const tlacitkoPredchozi = document.createElement("button");
    tlacitkoPredchozi.className = "lightbox-sipka";
    tlacitkoPredchozi.textContent = "‹";
    tlacitkoPredchozi.setAttribute("aria-label", "Předchozí obrázek");

    const zvetsenyObrazek = document.createElement("img");

    const tlacitkoDalsi = document.createElement("button");
    tlacitkoDalsi.className = "lightbox-sipka";
    tlacitkoDalsi.textContent = "›";
    tlacitkoDalsi.setAttribute("aria-label", "Další obrázek");

    overlay.append(tlacitkoPredchozi, zvetsenyObrazek, tlacitkoDalsi);
    document.body.appendChild(overlay);

    function zobrazObrazek(index) {
        aktualniIndex = (index + obrazky.length) % obrazky.length;
        const img = obrazky[aktualniIndex];
        zvetsenyObrazek.src = img.src;
        zvetsenyObrazek.alt = img.alt;
    }

    function zavriLightbox() {
        overlay.classList.remove("aktivni");
    }

    obrazky.forEach((img, index) => {
        img.addEventListener("click", () => {
            zobrazObrazek(index);
            overlay.classList.add("aktivni");
        });
    });

    tlacitkoPredchozi.addEventListener("click", (udalost) => {
        udalost.stopPropagation();
        zobrazObrazek(aktualniIndex - 1);
    });

    tlacitkoDalsi.addEventListener("click", (udalost) => {
        udalost.stopPropagation();
        zobrazObrazek(aktualniIndex + 1);
    });

    zvetsenyObrazek.addEventListener("click", (udalost) => udalost.stopPropagation());

    overlay.addEventListener("click", zavriLightbox);

    document.addEventListener("keydown", (udalost) => {
        if (!overlay.classList.contains("aktivni")) return;
        if (udalost.key === "Escape") zavriLightbox();
        if (udalost.key === "ArrowLeft") zobrazObrazek(aktualniIndex - 1);
        if (udalost.key === "ArrowRight") zobrazObrazek(aktualniIndex + 1);
    });
});
