
var slider = document.querySelector('.slider');
if (slider) {
    var track = slider.querySelector('.slider__track');
    var slides = slider.querySelectorAll('.slider__slide');
    var pagination = slider.querySelector('.slider__pagination');
    var totalSlides = slides.length;

    pagination.innerHTML = '';

    for (var i = 0; i < totalSlides; i++) { //definisati default vrijednost za prvi button
        var button = document.createElement('span');
        if (i === 0) {   //postavljam slajd na indexu 0 kao default aktivni slajd
            button.className = 'slider__pagination-item slider__pagination-item--active';
        } else {
            button.className = 'slider__pagination-item';
        }

        button.innerHTML = i + 1; //postavlja index za button
        button.dataset.index = i;

        //funkcija koja se izvrsava pri kliku na dugme
        button.onclick = function () {
            var index = parseInt(this.dataset.index);
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            // na track varijabli pomjera slajd 100% * inkrement i prikazuje sledeci slajd
            var buttons = pagination.children;


            for (var j = 0; j < buttons.length; j++) {
                buttons[j].className = 'slider__pagination-item';
                //dodavanje item klase svim spanovima (odnosno button-ima) i micanje active klase
            }
            this.className = 'slider__pagination-item slider__pagination-item--active';
                //postavljanje aktivne klase za kliknuto dugme
        };
        pagination.appendChild(button);
    }
}

// SECOND SLIDER

var footerSlider = document.querySelector('.footer__slider');
if (footerSlider) {
    var sliderTrack = document.querySelector('.footer__slider-track');
    var prevBtn = document.querySelector('.footer__buttons__slider-prev');
    var nextBtn = document.querySelector('.footer__buttons__slider-next');
    var slideWidth = document.querySelector('.footer__slider-inner').offsetWidth * 0.2;

    //kreirati objekat za varijable
    prevBtn.addEventListener('click', function() {
        sliderTrack.style.transition = "transform 0.2s ease-in-out";
        sliderTrack.style.transform = "translateX(-" + slideWidth + "px)";
        sliderTrack.addEventListener('transitionend', function handler() {
            sliderTrack.appendChild(sliderTrack.firstElementChild);
            sliderTrack.style.transition = "none";
            sliderTrack.style.transform = "translateX(0)";
            sliderTrack.offsetHeight;
            sliderTrack.style.transition = "transform 0.2s ease-in-out";
            sliderTrack.addEventListener('transitionend', function innerHandler() {
                console.log('Izvrsava se prevBtn animacija');
            });
            sliderTrack.removeEventListener('transitionend', handler);
        });
    });

    nextBtn.addEventListener('click', function() {
        sliderTrack.style.transition = "none";
        sliderTrack.insertBefore(sliderTrack.lastElementChild, sliderTrack.firstElementChild);
        sliderTrack.style.transform = "translateX(-" + slideWidth + "px)";
        sliderTrack.offsetHeight;
        sliderTrack.style.transition = "transform 0.2s ease-in-out";
        sliderTrack.addEventListener('transitionend', function innerHandler() {
            console.log('Izvrsava se nextBtn animacija');
        });
        sliderTrack.style.transform = "translateX(0)";
    });

    var autoSlideInterval = null;

    function updateStylesMediaQuery() {
        if (window.innerWidth <= 1300) { //napraviti funkciju
            prevBtn.style.opacity = '0';
            nextBtn.style.opacity = '0';
            if (!autoSlideInterval) {
                autoSlideInterval = setInterval(function() {
                    prevBtn.click();
                }, 1000);
            }
        } else {
            prevBtn.style.opacity = '1';
            nextBtn.style.opacity = '1';
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
    }

    updateStylesMediaQuery();
    window.addEventListener('resize', updateStylesMediaQuery);
}




// BRAND PROMO
document.addEventListener("DOMContentLoaded", function () {
    var brandPromos = document.querySelectorAll(".index__left__brand-promo");
    var closeAds = document.querySelectorAll(".index__left__brand-promo__commercial-close");
    if (window.innerWidth <= 1300) {
        brandPromos[0].classList.add("index__left__brand-promo--visible");
        setTimeout(() => brandPromos[1].classList.add("index__left__brand-promo--visible"), 15000)
        //posle 15 sekundi provedenih na stranici prikazi drugu reklamu
    }
    for (var i = 0; i < brandPromos.length; i++) {
        if (closeAds[i]) {
            closeAds[i].addEventListener("click", function (event) {
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
});





























// ACCORDION
document.addEventListener("DOMContentLoaded", function () {
    var accordionContainer = document.querySelector('.index__left__accordion');
    if (!accordionContainer) {
        return;
    }

    var mainHeader = accordionContainer.querySelector('.index__left__accordion__header');
    var mainCategories = accordionContainer.querySelectorAll(':scope > .index__left__accordion__item');

    var initialState = window.innerWidth < 1240 ? 'none' : 'block';
    for (var i = 0; i < mainCategories.length; i++) {
        mainCategories[i].style.display = initialState;
    }

    mainHeader.addEventListener('click', function (e) {
        e.preventDefault();
        var areVisible = mainCategories.length > 0 &&
            getComputedStyle(mainCategories[0]).display !== 'none';
        for (var i = 0; i < mainCategories.length; i++) {
            mainCategories[i].style.display = areVisible ? 'none' : 'block';
        }
    });

    for (var i = 0; i < mainCategories.length; i++) {
        (function (item) {
            var title = item.querySelector('.index__left__accordion__title');
            var content = item.querySelector('.index__left__accordion__content');

            if (title && content) {
                title.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (getComputedStyle(content).display === 'none') {
                        content.style.display = 'block';
                        var icon = title.querySelector('.index__left__accordion__icon');
                        if (icon) {
                            icon.textContent = '−';
                        }
                    } else {
                        content.style.display = 'none';
                        var icon = title.querySelector('.index__left__accordion__icon');
                        if (icon) {
                            icon.textContent = '+';
                        }
                    }
                });
            }
        })(mainCategories[i]);
    }
});

