
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MENU MOBILE
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector("#main-nav");

    if (menuToggle && mainNav) {

        function fecharMenu() {
            mainNav.classList.remove("menu-open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }

        menuToggle.addEventListener("click", () => {
            const aberto = mainNav.classList.toggle("menu-open");

            menuToggle.classList.toggle("active", aberto);
            menuToggle.setAttribute("aria-expanded", String(aberto));
            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", fecharMenu);
        });

        document.addEventListener("keydown", evento => {
            if (evento.key === "Escape") {
                fecharMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                fecharMenu();
            }
        });
    }


    /* =====================================
       ANO AUTOMÁTICO NO RODAPÉ
    ===================================== */

    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================
       ANIMAÇÃO AO ROLAR A PÁGINA
    ===================================== */

    const elementos = document.querySelectorAll(
        ".welcome-grid h2, " +
        ".welcome-image, " +
        ".welcome-copy, " +
        ".section-heading, " +
        ".meeting-card, " +
        ".leadership .section-kicker, " +
        ".leadership h2, " +
        ".leadership-intro, " +
        ".lider-card, " +
        ".visit-copy, " +
        ".visit-panel, " +
        ".instagram-band, " +
        ".verse-content"
    );

    const permiteAnimacao =
        "IntersectionObserver" in window &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (permiteAnimacao) {

        elementos.forEach(elemento => {
            elemento.classList.add("js-reveal");
        });

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }

            });

        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        });

        elementos.forEach(elemento => {
            observer.observe(elemento);
        });
    }


    /* =====================================
       GALERIA - AMPLIAR FOTOS
    ===================================== */

    const fotos = document.querySelectorAll("[data-gallery]");

    if (fotos.length) {

        const lightbox = document.createElement("div");
        lightbox.className = "gallery-lightbox";
        lightbox.hidden = true;

        lightbox.innerHTML = `
            <button class="gallery-close"
                    aria-label="Fechar imagem">×</button>
            <img src="" alt="">
        `;

        document.body.appendChild(lightbox);

        const imagem = lightbox.querySelector("img");
        const fechar = lightbox.querySelector(".gallery-close");

        let ultimoFoco = null;

        function fecharGaleria() {
            lightbox.hidden = true;
            imagem.removeAttribute("src");
            document.body.style.overflow = "";

            if (ultimoFoco) {
                ultimoFoco.focus();
            }
        }

        fotos.forEach(foto => {

            foto.addEventListener("click", evento => {
                evento.preventDefault();

                ultimoFoco = foto;

                imagem.src = foto.href;
                imagem.alt = foto.querySelector("img")?.alt || "";

                lightbox.hidden = false;
                document.body.style.overflow = "hidden";

                fechar.focus();
            });

        });

        fechar.addEventListener("click", fecharGaleria);

        lightbox.addEventListener("click", evento => {
            if (evento.target === lightbox) {
                fecharGaleria();
            }
        });

        document.addEventListener("keydown", evento => {

            if (lightbox.hidden) return;

            if (evento.key === "Escape") {
                fecharGaleria();
            }

            if (evento.key === "Tab") {
                evento.preventDefault();
                fechar.focus();
            }

        });
    }

});
