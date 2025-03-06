
function increase() {
    let input = document.getElementById("numInput");
    input.value = parseInt(input.value) + 1;
}


(function initAdditionalTabs() {
    var tabsObj = {
        tabs: document.querySelectorAll('.product-detail__additional__tabs__tab'),
        tabContents: document.querySelectorAll('.product-detail__additional__tab-content')
    };

    tabsObj.tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabsObj.tabs.forEach(function(t) {
                t.classList.remove('product-detail__additional__tabs__tab--active');
            });
            tabsObj.tabContents.forEach(function(tc) {
                tc.classList.remove('product-detail__additional__tab-content--active');
            });
            this.classList.add('product-detail__additional__tabs__tab--active');
            var content = document.getElementById(this.dataset.tab);
            if (content) {
                content.classList.add('product-detail__additional__tab-content--active');
            }
        });
    });
})();



var videoBox = $('.product-detail__sidebar__video-box');
if (videoBox) {
    var playButton = document.querySelectorAll('.product-detail__sidebar__video-box__play-button');
    var video = document.querySelectorAll('.product-detail__sidebar__video-box__content');
    var thumbnail = document.querySelectorAll('.product-detail__sidebar__video-box__thumbnail');
    //napraviti objekat
    //napraviti play-stop funkciju
    playButton[0].addEventListener('click', function() {
        if (video[0].paused === true){
            video[0].play();
            video[0].style.display = 'block'
            thumbnail[0].style.display = 'none'
            playButton[0].style.display = 'none'
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


//slider
var slider = document.querySelector(".product-detail__gallery__slider");
if (slider) {
    var sliderProperties = {
        sliderTrack: document.querySelector(".product-detail__gallery__slider__track"),
        sliderTrackSlides: document.querySelectorAll(".product-detail__gallery__slider__track-slide"),
        activeSlide: document.querySelector(".product-detail__gallery__slider__track-slide--active"),

        sliderThumbnails: document.querySelectorAll(".product-detail__gallery__slider__thumbnails-item"),
        activeThumbnail: document.querySelector(".product-detail__gallery__slider__thumbnails-item--active"),

        prevBtn: document.querySelector(".product-detail__gallery__slider__thumbnails-arrow--prev"),
        nextBtn: document.querySelector(".product-detail__gallery__slider__thumbnails-arrow--next")
    };
    var thumbnailsArray = Array.from(sliderProperties.sliderThumbnails);
    var activeIndex = thumbnailsArray.indexOf(sliderProperties.activeThumbnail);
    var slidesArray = Array.from(sliderProperties.sliderTrackSlides);
    function updateActiveSlide() {
        slidesArray.forEach(function(slide) {
            slide.classList.remove("product-detail__gallery__slider__track-slide--active");
        });
        slidesArray[activeIndex].classList.add("product-detail__gallery__slider__track-slide--active");
    }
    function thumbClick() {
        for (let i = 0; i < thumbnailsArray.length; i++) {
            thumbnailsArray[i].addEventListener("click", function() {
                thumbnailsArray[activeIndex].classList.remove("product-detail__gallery__slider__thumbnails-item--active");
                activeIndex = i;
                thumbnailsArray[i].classList.add("product-detail__gallery__slider__thumbnails-item--active");
                updateActiveSlide();
            });
        }
    }
    thumbClick();
    sliderProperties.nextBtn.addEventListener("click", function() {
        moveRightThumb();
    });
    sliderProperties.prevBtn.addEventListener("click", function() {
        moveLeftThumb();
    });
    function moveRightThumb() {
        if (activeIndex === thumbnailsArray.length - 1) {
            thumbnailsArray[activeIndex].classList.remove("product-detail__gallery__slider__thumbnails-item--active");
            activeIndex = 0;
            thumbnailsArray[activeIndex].classList.add("product-detail__gallery__slider__thumbnails-item--active");
        } else {
            thumbnailsArray[activeIndex].classList.remove("product-detail__gallery__slider__thumbnails-item--active");
            activeIndex++;
            thumbnailsArray[activeIndex].classList.add("product-detail__gallery__slider__thumbnails-item--active");
        }
        updateActiveSlide();
    }
    function moveLeftThumb() {
        if (activeIndex === 0) {
            thumbnailsArray[activeIndex].classList.remove("product-detail__gallery__slider__thumbnails-item--active");
            activeIndex = thumbnailsArray.length - 1;
            thumbnailsArray[activeIndex].classList.add("product-detail__gallery__slider__thumbnails-item--active");
        } else {
            thumbnailsArray[activeIndex].classList.remove("product-detail__gallery__slider__thumbnails-item--active");
            activeIndex--;
            thumbnailsArray[activeIndex].classList.add("product-detail__gallery__slider__thumbnails-item--active");
        }
        updateActiveSlide();
    }
}

//probati fetch
(function() {
    async function getData() {
        try {
            const response = await fetch('src/products.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const productsContainer = $('.index__right__hot-offer__product-list');
            productsContainer.empty();

            if (data.hotOffer && data.hotOffer.length > 0) {
                data.hotOffer.forEach(function(product) {
                    const productHTML = `
            <div class="index__right__hot-offer__product">
              <span class="index__right__hot-offer__product__discount">${product.discount}</span>
              <img src="${product.image}" alt="${product.title}" class="index__right__hot-offer__product__img">
              <h3 class="index__right__hot-offer__product__title">${product.title}</h3>
              <p class="index__right__hot-offer__product__timer">${product.timer}</p>
              <p class="index__right__hot-offer__product__price">
                <span class="index__right__hot-offer__product__old-price">${product.oldPrice}</span>
                <span class="index__right__hot-offer__product__new-price">${product.newPrice}</span>
              </p>
            </div>
          `;
                    productsContainer.append(productHTML);
                });
            } else {
                console.log("No products found.");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    getData();
})();



