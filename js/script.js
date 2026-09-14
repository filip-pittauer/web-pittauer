document.addEventListener("DOMContentLoaded", () => {
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
