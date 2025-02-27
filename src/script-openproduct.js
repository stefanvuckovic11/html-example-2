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



var videoBox = $('.product-detail__sidebar__video-box');
if (videoBox) {
    var playButton = document.querySelectorAll('.product-detail__sidebar__video-box__play-button');
    var video = document.querySelectorAll('.product-detail__sidebar__video-box__content');
    var thumbnail = document.querySelectorAll('.product-detail__sidebar__video-box__thumbnail');
    playButton[0].addEventListener('click', function() {
        if (video[0].paused === true){
            video[0].style.display = 'block'
            thumbnail[0].style.display = 'none'
            playButton[0].style.display = 'none'
            video[0].play();

        } else {
            video[0].pause();
        }
    })

    video[0].addEventListener('click', function() {
        if (video[0].paused === false){
            video[0].style.display = 'none'
            thumbnail[0].style.display = 'block'
            playButton[0].style.display = 'block'
        }
    })

    playButton[1].addEventListener('click', function() {
        if (video[1].paused === true){
            video[1].style.display = 'block'
            thumbnail[1].style.display = 'none'
            playButton[1].style.display = 'none'
            video[1].play();

        } else {
            video[1].pause();
        }
    })

    video[1].addEventListener('click', function() {
        if (video[1].paused === false){
            video[1].style.display = 'none'
            thumbnail[1].style.display = 'block'
            playButton[1].style.display = 'block'
        }
    })
}




//footer slider//
var footerSlider = document.querySelector('.footer__slider');
if (footerSlider) {
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
            sliderTrack.addEventListener('transitionend', function innerHandler() {
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
        sliderTrack.addEventListener('transitionend', function innerHandler() {});
        sliderTrack.style.transform = "translateX(0)";
    });

    var autoSlideInterval = null;

    function updateStylesMediaQuery() {
        if (window.innerWidth <= 1300) {
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


//modal slike//
(function(){
    var modal = document.getElementById('imageModal'),
        modalImg = document.getElementById('modalImage'),
        close = document.querySelector('.product-detail__modal__close');
    document.addEventListener('click', function(e){
        if(e.target.classList.contains('product-detail__slider__list-item__img')){
            modalImg.src = e.target.src;
            modal.style.display = 'block';
        }
    });
    close.addEventListener('click', function(){ modal.style.display = 'none'; });
    modal.addEventListener('click', function(e){
        if(e.target !== modalImg && e.target !== close){}
            modal.style.display = 'none'; });
})();



