    $(document).ready(function() {
    var sliderSecond = $('.bxslider-second').bxSlider({
    nextText: '',
    prevText: '',
    minSlides: 3,
    maxSlides: 3,
    moveSlides: 1,
    slideWidth: '100%',
    slideMargin: 0,
    auto: false,
    controls: true,
    pager: false,
    infiniteLoop: true,
    adaptiveHeight: false,
    maxWidth:1,

});

    $('.slider-prev').click(function(e){
    e.preventDefault();
    sliderSecond.goToPrevSlide();
});

    $('.slider-next').click(function(e){
    e.preventDefault();
    sliderSecond.goToNextSlide();
});
});

    $(document).ready(function() {
    var productSlider = $('.product-slider .bxslider').bxSlider({
    auto: false,
    controls: false,
    pager: false,
    infiniteLoop: true,
    adaptiveHeight: false,
    responsive: false,
    touchEnabled: false,
    useCSS: false,

});

    var thumbSlider = $('#bx-pager').bxSlider({
    minSlides: 3,
    maxSlides: 3,
    moveSlides: 1,
    slideWidth: 400,
    slideMargin: 0,
    auto: false,
    pager: false,
    controls: false,
    infiniteLoop: false
});

    $('.slider-prev-product').click(function(e){
    e.preventDefault();
    thumbSlider.goToPrevSlide();
});

    $('.slider-next-product').click(function(e){
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


    document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
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

