function initSlider() {
    var sliderObj = {
        slider: document.querySelector(".slider"),
        track: null,
        slides: null,
        pagination: null,
        totalSlides: 0
    };

    if (sliderObj.slider) {
        sliderObj.track = sliderObj.slider.querySelector(".slider__track");
        sliderObj.slides = sliderObj.slider.querySelectorAll(".slider__slide");
        sliderObj.pagination = sliderObj.slider.querySelector(".slider__pagination");
        sliderObj.totalSlides = sliderObj.slides.length;

        sliderObj.pagination.innerHTML = "";

        for (var i = 0; i < sliderObj.totalSlides; i++) {
            var button = document.createElement("span");
            button.className = (i === 0)
                ? "slider__pagination-item slider__pagination-item--active"
                : "slider__pagination-item";
            button.innerHTML = i + 1;
            button.dataset.index = i;

            button.onclick = function () {
                var index = parseInt(this.dataset.index, 10);
                sliderObj.track.style.transform = "translateX(-" + index * 100 + "%)";
                var buttons = sliderObj.pagination.children;
                for (var j = 0; j < buttons.length; j++) {
                    buttons[j].className = "slider__pagination-item";
                }
                this.className = "slider__pagination-item slider__pagination-item--active";
            };
            sliderObj.pagination.appendChild(button);
        }
    }
}

function initFooterSlider() {
    var footerObj = {
        footerSlider: document.querySelector(".footer__slider"),
        sliderTrack: document.querySelector(".footer__slider-track"),
        prevBtn: document.querySelector(".footer__buttons__slider-prev"),
        nextBtn: document.querySelector(".footer__buttons__slider-next"),
        slideWidth: document.querySelector(".footer__slider-inner")
            ? document.querySelector(".footer__slider-inner").offsetWidth * 0.2
            : 0,
        autoSlideInterval: null
    };

    if (footerObj.footerSlider) {
        footerObj.prevBtn.addEventListener("click", function () {
            footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
            footerObj.sliderTrack.style.transform = "translateX(-" + footerObj.slideWidth + "px)";
            footerObj.sliderTrack.addEventListener("transitionend", function handler() {
                footerObj.sliderTrack.appendChild(footerObj.sliderTrack.firstElementChild);
                footerObj.sliderTrack.style.transition = "none";
                footerObj.sliderTrack.style.transform = "translateX(0)";
                footerObj.sliderTrack.offsetHeight;
                footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
                footerObj.sliderTrack.removeEventListener("transitionend", handler);
            });
        });

        footerObj.nextBtn.addEventListener("click", function () {
            footerObj.sliderTrack.style.transition = "none";
            footerObj.sliderTrack.insertBefore(
                footerObj.sliderTrack.lastElementChild,
                footerObj.sliderTrack.firstElementChild
            );
            footerObj.sliderTrack.style.transform = "translateX(-" + footerObj.slideWidth + "px)";
            footerObj.sliderTrack.offsetHeight;
            footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
            footerObj.sliderTrack.style.transform = "translateX(0)";
        });

        function updateStylesMediaQuery() {
            if (window.innerWidth <= 1300) {
                footerObj.prevBtn.style.opacity = "0";
                footerObj.nextBtn.style.opacity = "0";
                if (!footerObj.autoSlideInterval) {
                    footerObj.autoSlideInterval = setInterval(function () {
                        footerObj.prevBtn.click();
                    }, 1000);
                }
            } else {
                footerObj.prevBtn.style.opacity = "1";
                footerObj.nextBtn.style.opacity = "1";
                if (footerObj.autoSlideInterval) {
                    clearInterval(footerObj.autoSlideInterval);
                    footerObj.autoSlideInterval = null;
                }
            }
        }
        updateStylesMediaQuery();
        window.addEventListener("resize", updateStylesMediaQuery);
    }
}

function initBrandPromos() {
    var brandPromoObj = {
        brandPromos: document.querySelectorAll(".index__left__brand-promo"),
        closeAds: document.querySelectorAll(".index__left__brand-promo__commercial-close")
    };

    if (window.innerWidth <= 1300) {
        if (brandPromoObj.brandPromos[0]) {
            brandPromoObj.brandPromos[0].classList.add("index__left__brand-promo--visible");
        }
        if (brandPromoObj.brandPromos[1]) {
            setTimeout(function () {
                brandPromoObj.brandPromos[1].classList.add("index__left__brand-promo--visible");
            }, 15000);
        }
    }

    for (var i = 0; i < brandPromoObj.brandPromos.length; i++) {
        if (brandPromoObj.closeAds[i]) {
            brandPromoObj.closeAds[i].addEventListener("click", function (event) {
                var promo = event.target.closest(".index__left__brand-promo");
                if (promo) {
                    promo.style.opacity = "0";
                    setTimeout(function () {
                        promo.style.display = "none";
                    }, 300);
                }
            });
        }
    }
}


window.initIndexScripts = function() {
    initSlider();
    initFooterSlider();
    initBrandPromos();
};
