$(document).ready(function() {
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

    $('.footer__slider-prev').click(function(e){
        e.preventDefault();
        sliderSecond.goToPrevSlide();
    });

    $('.footer__slider-next').click(function(e){
        e.preventDefault();
        sliderSecond.goToNextSlide();
    });
});



$(document).ready(function() {
    var productSlider = $('.product-detail__slider__list').bxSlider({
        auto: false,
        controls: false,
        pager: false,
        infiniteLoop: true,
        adaptiveHeight: true,
        responsive: false,
        touchEnabled: false,
        useCSS: true,
        maxSlides:1,
    });

    var thumbSlider = $('#bx-pager').bxSlider({
        slideWidth: 150,
        slideHeight: 150,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        pager: false,
        controls: false,
        infiniteLoop: false,
        shrinkItems: true
    });

    $('.product-detail__gallery__thumbs__prev').click(function(e){
        e.preventDefault();
        thumbSlider.goToPrevSlide();
    });

    $('.product-detail__gallery__thumbs__next').click(function(e){
        e.preventDefault();
        thumbSlider.goToNextSlide();
    });

    $('#bx-pager a').click(function(e) {
        e.preventDefault();
        var index = $(this).index();
        productSlider.goToSlide(index);
    });
});


function increase() {
    let input = document.getElementById("numInput");
    input.value = parseInt(input.value) + 1;
}


document.querySelectorAll('.product-detail__additional__tabs__tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.product-detail__additional__tabs__tab')
            .forEach(t => t.classList.remove('product-detail__additional__tabs__tab--active'));
        document.querySelectorAll('.product-detail__additional__tab-content')
            .forEach(tc => tc.classList.remove('product-detail__additional__tab-content--active'));

        this.classList.add('product-detail__additional__tabs__tab--active');
        document.getElementById(this.dataset.tab)
            .classList.add('product-detail__additional__tab-content--active');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.video-box').forEach(function (box) {
        var playButton = box.querySelector('.video-box__play-button');
        if (playButton) {
            playButton.addEventListener('click', function () {
                var thumbnail = box.querySelector('.video-box__thumbnail');
                var video = box.querySelector('.video-box__content');
                if (thumbnail) {
                    thumbnail.style.display = 'none';
                }
                playButton.style.display = 'none';
                if (video) {
                    video.style.display = 'block';
                    video.play();
                }
            });
        }
    });
});

$('.product-detail__slider__list-item__img').on('click', function () {
    var src = $(this).attr('src');
    $('#modalImage').attr('src', src);
    $('#imageModal').fadeIn();
});

$('.modal__close').on('click', function () {
    $('#imageModal').fadeOut();
});

$('#imageModal').on('click', function (e) {
    if (!$(e.target).is('.modal__image') && !$(e.target).is('.modal__close')) {
        $(this).fadeOut();
    }
});


//footer slider//
document.addEventListener("DOMContentLoaded", function() {
    var sliderTrack = document.querySelector('.footer__slider-track');
    var prevBtn = document.querySelector('.footer__buttons__slider-prev');
    var nextBtn = document.querySelector('.footer__buttons__slider-next');

    var slideWidth = document.querySelector('.footer__slider-inner').offsetWidth * 0.2;

    prevBtn.addEventListener('click', function() {
        sliderTrack.style.transition = "transform 0.2s ease-in-out";
        sliderTrack.style.transform = "translateX(-" + slideWidth + "px)";
        sliderTrack.addEventListener('transitionend', function handler() {
            sliderTrack.appendChild(sliderTrack.firstElementChild);
            sliderTrack.style.transition = "none";
            sliderTrack.style.transform = "translateX(0)";
            sliderTrack.offsetHeight;
            sliderTrack.style.transition = "transform 0.2s ease-in-out";
            sliderTrack.addEventListener('transitionend', function handler() {
                console.log('zavrsila se animacija')
            })
            sliderTrack.removeEventListener('transitionend', handler);
        });
    });

    nextBtn.addEventListener('click', function() {
        sliderTrack.style.transition = "none";
        sliderTrack.insertBefore(sliderTrack.lastElementChild, sliderTrack.firstElementChild);
        sliderTrack.style.transform = "translateX(-" + slideWidth + "px)";
        sliderTrack.offsetHeight;
        sliderTrack.style.transition = "transform 0.2s ease-in-out";
        sliderTrack.style.transform = "translateX(0)";
    });
});

