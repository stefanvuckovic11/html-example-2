
var slider = document.querySelector('.slider');
if (slider) {
    var track = slider.querySelector('.slider__track');
    var slides = slider.querySelectorAll('.slider__slide');
    var pagination = slider.querySelector('.slider__pagination');
    var totalSlides = slides.length;

    pagination.innerHTML = '';

    for (var i = 0; i < totalSlides; i++) {
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
var footerSlider = document.querySelector('.slider');
if (footerSlider) {
    const sliderTrack = document.querySelector('.footer__slider-track');
    const prevBtn = document.querySelector('.footer__buttons__slider-prev');
    const nextBtn = document.querySelector('.footer__buttons__slider-next');

    prevBtn.addEventListener('click', function () {
        const firstSlide = sliderTrack.firstElementChild;
        sliderTrack.appendChild(firstSlide);
    })

    nextBtn.addEventListener('click', function () {
        const lastSlide = sliderTrack.lastElementChild;
        sliderTrack.insertBefore(lastSlide, sliderTrack.firstElementChild);
    })

}




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


// BRAND PROMO
document.addEventListener("DOMContentLoaded", function () {
    var brandPromo = document.querySelector(".index__left__brand-promo");
    var closeAd = document.querySelector(".index__left__brand-promo__commercial-close");

    if (window.innerWidth <= 1300) {
        brandPromo.classList.add("index__left__brand-promo--visible");
    }

    if (closeAd) {
        closeAd.addEventListener("click", function () {
            brandPromo.style.opacity = "0";
            brandPromo.style.transform = "translateY(20px)";
            setTimeout(function () {
                brandPromo.style.display = "none";
            }, 300);
        });
    }
});


