 //SLIDER//
    $(document).ready(function(){
    var totalSlides = $('.bxslider li').length;
    var progressBar = $('.progress-bar');

    var slider = $('.bxslider').bxSlider({
    adaptiveHeight: false,
    controls: false,
    infiniteLoop: true,
    pager: true,
    auto: false,
    speed: 500,
    pause: 4000,
    buildPager: function(slideIndex) {
    return slideIndex + 1;
},
    onSliderLoad: function() {
    updateProgress(0);
},
    onSlideBefore: function($slideElement, oldIndex, newIndex) {
    updateProgress(newIndex);
}
});

    function updateProgress(index) {
    var percentage = ((index + 1) / totalSlides) * 97;
    progressBar.stop().animate({ width: percentage + '%' }, 500);
}
});
    $(document).ready(function() {
    var sliderFirst = $('.bxslider').bxSlider({
    auto: true,
    controls: true,
    pager: false,
    infiniteLoop: true
});

    // SECOND SLIDER (with multiple images per slide)
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
    infiniteLoop: true,
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

    //ACCORDION//
    document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach(accordion => {
    const header = accordion.querySelector(".accordion-title");
    const bodyContent = accordion.querySelector(".accordion-content");
    const toggleIcon = header.querySelector(".icon");
    header.addEventListener("click", (event) => {
    event.preventDefault();
    const isCurrentlyActive = accordion.classList.contains("active");
    accordionItems.forEach(item => {
    const itemContent = item.querySelector(".accordion-content");
    const itemIcon = item.querySelector(".icon");

    item.classList.remove("active");
    if (itemContent) itemContent.style.display = "none";
    if (itemIcon) itemIcon.textContent = "+";
});
    if (!isCurrentlyActive) {
    accordion.classList.add("active");
    bodyContent.style.display = "block";

    if (toggleIcon) toggleIcon.textContent = "−";
}
});
});
});


    document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".accordion__item");
    accordionItems.forEach(accordion => {
    const header = accordion.querySelector(".accordion__title");
    const bodyContent = accordion.querySelector(".accordion__content");
    const toggleIcon = header.querySelector(".accordion__icon");
    header.addEventListener("click", (event) => {
    event.preventDefault();
    const isCurrentlyActive = accordion.classList.contains("active");
    accordionItems.forEach(item => {
    const itemContent = item.querySelector(".accordion__content");
    const itemIcon = item.querySelector(".accordion__icon");

    item.classList.remove("active");
    if (itemContent) itemContent.style.display = "none";
    if (itemIcon) itemIcon.textContent = "+";
});
    if (!isCurrentlyActive) {
    accordion.classList.add("active");
    bodyContent.style.display = "block";

    if (toggleIcon) toggleIcon.textContent = "−";
}
});
});
});