function initSlider() {
    const slider = document.querySelector(".slider");
    if (!slider) return;

    const track = slider.querySelector(".slider__track");
    const slides = slider.querySelectorAll(".slider__slide");
    const pagination = slider.querySelector(".slider__pagination");

    pagination.innerHTML = "";

    slides.forEach((_, i) => {
        const button = document.createElement("span");
        button.className = "slider__pagination-item" + (i === 0 ? " slider__pagination-item--active" : "");
        button.innerText = i + 1;
        button.dataset.index = i;

        button.onclick = () => {
            const index = parseInt(button.dataset.index, 10);
            track.style.transform = `translateX(-${index * 100}%)`;

            [...pagination.children].forEach(b => b.classList.remove("slider__pagination-item--active"));
            button.classList.add("slider__pagination-item--active");
        };

        pagination.appendChild(button);
    });
}

function initFooterSlider() {
    const footerSlider = document.querySelector(".footer__slider");
    const sliderTrack = document.querySelector(".footer__slider-track");
    const prevBtn = document.querySelector(".footer__buttons__slider-prev");
    const nextBtn = document.querySelector(".footer__buttons__slider-next");
    const slideWidth = document.querySelector(".footer__slider-inner")?.offsetWidth * 0.2 || 0;

    let autoSlideInterval = null;
    if (!footerSlider) return;

    prevBtn?.addEventListener("click", () => {
        sliderTrack.style.transition = "transform 0.2s ease-in-out";
        sliderTrack.style.transform = `translateX(-${slideWidth}px)`;

        sliderTrack.addEventListener("transitionend", function handler() {
            sliderTrack.appendChild(sliderTrack.firstElementChild);
            sliderTrack.style.transition = "none";
            sliderTrack.style.transform = "translateX(0)";
            void sliderTrack.offsetHeight;
            sliderTrack.style.transition = "transform 0.2s ease-in-out";
            sliderTrack.removeEventListener("transitionend", handler);
        });
    });

    nextBtn?.addEventListener("click", () => {
        sliderTrack.style.transition = "none";
        sliderTrack.insertBefore(sliderTrack.lastElementChild, sliderTrack.firstElementChild);
        sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
        void sliderTrack.offsetHeight;
        sliderTrack.style.transition = "transform 0.2s ease-in-out";
        sliderTrack.style.transform = "translateX(0)";
    });

    function updateMediaBehavior() {
        if (window.innerWidth <= 1300) {
            prevBtn.style.opacity = "0";
            nextBtn.style.opacity = "0";
            if (!autoSlideInterval) {
                autoSlideInterval = setInterval(() => prevBtn.click(), 1000);
            }
        } else {
            prevBtn.style.opacity = "1";
            nextBtn.style.opacity = "1";
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    updateMediaBehavior();
    window.addEventListener("resize", updateMediaBehavior);
}

function initBrandPromos() {
    const promos = document.querySelectorAll(".index__left__brand-promo");
    const closes = document.querySelectorAll(".index__left__brand-promo__commercial-close");

    if (window.innerWidth <= 1300) {
        promos[0]?.classList.add("index__left__brand-promo--visible");
        setTimeout(() => promos[1]?.classList.add("index__left__brand-promo--visible"), 15000);
    }

    closes.forEach((closeBtn, i) => {
        closeBtn.addEventListener("click", () => {
            const promo = closeBtn.closest(".index__left__brand-promo");
            promo.style.opacity = "0";
            setTimeout(() => promo.style.display = "none", 300);
        });
    });
}

function loadIndexPartials() {
    const content = document.getElementById("app");

    const partials = [
        ["main", "views/layouts/main.handlebars"],
        ["indexLeft/accordion", "views/partials/indexLeft/accordion.handlebars"],
        ["indexLeft/brandPromo", "views/partials/indexLeft/brandPromo.handlebars"],
        ["indexLeft/brandSearch", "views/partials/indexLeft/brandSearch.handlebars"],
        ["indexLeft/newsletter", "views/partials/indexLeft/newsletter.handlebars"],
        ["indexLeft/productCard", "views/partials/indexLeft/productCard.handlebars"],
        ["indexRight/slider", "views/partials/indexRight/slider.handlebars"],
        ["indexRight/previewPartial", "views/partials/indexRight/previewPartial.handlebars"],
        ["indexRight/brandSearchRight", "views/partials/indexRight/brandSearchRight.handlebars"],
        ["indexRight/newsletterRight", "views/partials/indexRight/newsletterRight.handlebars"]
    ];

    let chain = Promise.resolve();

    partials.forEach(([name, path]) => {
        chain = chain.then(() => axios.get(path).then(res => {
            Handlebars.registerPartial(name, res.data);
        }));
    });

    chain.then(() => {
        const indexTemplate = Handlebars.compile(document.getElementById("indexTemplate").innerHTML);
        const mainTemplate = Handlebars.compile(document.getElementById("mainLayoutTemplate").innerHTML);
        const indexHTML = indexTemplate({});
        const finalHTML = mainTemplate({ title: "Example App", body: indexHTML });
        content.innerHTML = finalHTML;

        window.initIndexScripts();
        window.initAccordion();
        window.initProductLoader();
    }).catch(err => console.error("Greška u učitavanju partiala:", err));
}

window.initIndexScripts = function () {
    initSlider();
    initFooterSlider();
    initBrandPromos();
};

document.addEventListener("DOMContentLoaded", () => {
    loadIndexPartials();
});
