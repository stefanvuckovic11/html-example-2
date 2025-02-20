$(document).ready(function () {
    var totalSlides = $('.slider__list-item').length;
    var progressBar = $('.slider__progress-bar');

    var slider = $('.slider__list').bxSlider({
        adaptiveHeight: false,
        controls: false,
        infiniteLoop: true,
        auto: false,
        speed: 500,
        pause: 4000,
        pager: true,
        buildPager: function (slideIndex) {
            return slideIndex + 1;
        },
        onSliderLoad: function () {
            updateProgress(0);
            $('.bx-pager')
                .removeClass('bx-pager')
                .addClass('slider__pager');
            $('.bx-pager-item')
                .removeClass('bx-pager-item')
                .addClass('slider__pager-item');
            $('.bx-pager-link')
                .removeClass('bx-pager-link')
                .addClass('slider__pager-link');
        },
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
            updateProgress(newIndex);
        }
    });

    function updateProgress(index) {
        var percentage = ((index + 1) / totalSlides) * 100;
        progressBar.stop().animate({width: percentage + '%'}, 500);
    }
});


// SECOND SLIDER
$(document).ready(function () {
    var sliderSecond = $('.bxslider-second').bxSlider({
        nextText: '',
        prevText: '',
        minSlides: 5,
        maxSlides: 5,
        moveSlides: 1,
        slideWidth: '200%',
        slideMargin: 0,
        auto: false,
        controls: true,
        pager: false,
        infiniteLoop: true
    });

    $('.footer__slider-prev').click(function (e) {
        e.preventDefault();
        sliderSecond.goToPrevSlide();
    });

    $('.footer__slider-next').click(function (e) {
        e.preventDefault();
        sliderSecond.goToNextSlide();
    });
});


//ACCORDION//
document.addEventListener("DOMContentLoaded", function () {
    const accordionContainer = document.querySelector('.index__left__accordion');
    if (!accordionContainer) return;

    const mainHeader = accordionContainer.querySelector('.index__left__accordion__header');
    const mainCategories = accordionContainer.querySelectorAll(':scope > .index__left__accordion__item');

    const initialState = window.innerWidth < 1240 ? 'none' : 'block';
    mainCategories.forEach(item => {
        item.style.display = initialState;
    });

    mainHeader.addEventListener('click', function (e) {
        e.preventDefault();
        let areVisible = mainCategories.length > 0 &&
            getComputedStyle(mainCategories[0]).display !== 'none';

        mainCategories.forEach(item => {
            item.style.display = areVisible ? 'none' : 'block';
        });
    });

    mainCategories.forEach(item => {
        const title = item.querySelector('.index__left__accordion__title');
        const content = item.querySelector('.index__left__accordion__content');

        if (title && content) {
            title.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (getComputedStyle(content).display === 'none') {
                    content.style.display = 'block';
                    const icon = title.querySelector('.index__left__accordion__icon');
                    if (icon) icon.textContent = '−';
                } else {
                    content.style.display = 'none';
                    const icon = title.querySelector('.index__left__accordion__icon');
                    if (icon) icon.textContent = '+';
                }
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const brandPromo = document.querySelector(".index__left__brand-promo");
    const closeAd = document.querySelector(".index__left__brand-promo__commercial-close");

    if (window.innerWidth <= 1300) {
        brandPromo.classList.add("index__left__brand-promo--visible"); // Show only on small screens
    }

    if (closeAd) {
        closeAd.addEventListener("click", function () {
            brandPromo.style.opacity = "0";
            brandPromo.style.transform = "translateY(20px)";
            setTimeout(() => {
                brandPromo.style.display = "none";
            }, 300); // Fade out effect
        });
    }
});

