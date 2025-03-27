(function () {
    function increase() {
        var input = document.getElementById("numInput");
        if (input) {
            input.value = parseInt(input.value, 10) + 1;
        }
    }
    window.increase = increase;
    function initAdditionalTabs() {
        var tabs = document.querySelectorAll(".product-detail__additional__tabs__tab");
        var tabContents = document.querySelectorAll(".product-detail__additional__tab-content");
        Array.prototype.forEach.call(tabs, function (tab) {
            tab.addEventListener("click", function () {
                Array.prototype.forEach.call(tabs, function (t) {
                    t.classList.remove("product-detail__additional__tabs__tab--active");
                });
                Array.prototype.forEach.call(tabContents, function (tc) {
                    tc.classList.remove("product-detail__additional__tab-content--active");
                });
                this.classList.add("product-detail__additional__tabs__tab--active");
                var content = document.getElementById(this.dataset.tab);
                if (content) {
                    content.classList.add("product-detail__additional__tab-content--active");
                }
            });
        });
    }
    initAdditionalTabs();
    function initVideoEvents() {
        var videoBoxes = document.querySelectorAll(".product-detail__sidebar__video-box");
        if (videoBoxes.length) {
            videoBoxes.forEach(function(box) {
                var playButton = box.querySelector(".product-detail__sidebar__video-box__play-button");
                var video = box.querySelector(".product-detail__sidebar__video-box__content");
                var thumbnail = box.querySelector(".product-detail__sidebar__video-box__thumbnail");
                if (playButton && video && thumbnail) {
                    playButton.addEventListener("click", function () {
                        if (video.paused) {
                            video.play();
                            video.style.display = "block";
                            thumbnail.style.display = "none";
                            playButton.style.display = "none";
                        } else {
                            video.pause();
                        }
                    });
                    video.addEventListener("click", function () {
                        if (!video.paused) {
                            video.style.display = "none";
                            thumbnail.style.display = "block";
                            playButton.style.display = "block";
                        }
                    });
                }
            });
        }
    }
    function initFooterSlider() {
        var footerSlider = document.querySelector(".footer__slider");
        if (footerSlider) {
            var sliderTrack = document.querySelector(".footer__slider-track");
            var prevBtn = document.querySelector(".footer__buttons__slider-prev");
            var nextBtn = document.querySelector(".footer__buttons__slider-next");
            var slideWidth = document.querySelector(".footer__slider-inner").offsetWidth * 0.2;
            prevBtn.addEventListener("click", function () {
                sliderTrack.style.transition = "transform 0.2s ease-in-out";
                sliderTrack.style.transform = "translateX(-" + slideWidth + "px)";
                sliderTrack.addEventListener("transitionend", function handler() {
                    sliderTrack.appendChild(sliderTrack.firstElementChild);
                    sliderTrack.style.transition = "none";
                    sliderTrack.style.transform = "translateX(0)";
                    sliderTrack.offsetHeight;
                    sliderTrack.style.transition = "transform 0.2s ease-in-out";
                    sliderTrack.removeEventListener("transitionend", handler);
                });
            });
            nextBtn.addEventListener("click", function () {
                sliderTrack.style.transition = "none";
                sliderTrack.insertBefore(sliderTrack.lastElementChild, sliderTrack.firstElementChild);
                sliderTrack.style.transform = "translateX(-" + slideWidth + "px)";
                sliderTrack.offsetHeight;
                sliderTrack.style.transition = "transform 0.2s ease-in-out";
                sliderTrack.style.transform = "translateX(0)";
            });
            var autoSlideInterval = null;
            function updateStylesMediaQuery() {
                if (window.innerWidth <= 1300) {
                    prevBtn.style.opacity = "0";
                    nextBtn.style.opacity = "0";
                    if (!autoSlideInterval) {
                        autoSlideInterval = setInterval(function () {
                            prevBtn.click();
                        }, 1000);
                    }
                } else {
                    prevBtn.style.opacity = "1";
                    nextBtn.style.opacity = "1";
                    if (autoSlideInterval) {
                        clearInterval(autoSlideInterval);
                        autoSlideInterval = null;
                    }
                }
            }
            updateStylesMediaQuery();
            window.addEventListener("resize", updateStylesMediaQuery);
        }
    }
    function initModal() {
        var modal = document.getElementById("imageModal");
        var modalImg = document.getElementById("modalImage");
        var closeBtn = document.querySelector(".product-detail__modal__close");
        if (modal && modalImg && closeBtn) {
            document.addEventListener("click", function (e) {
                if (e.target.classList.contains("product-detail__gallery__slider__track-slide-img")) {
                    modalImg.src = e.target.src;
                    modal.style.display = "block";
                }
            });
            closeBtn.addEventListener("click", function () {
                modal.style.display = "none";
            });
            modal.addEventListener("click", function (e) {
                if (e.target !== modalImg && e.target !== closeBtn) {
                    modal.style.display = "none";
                }
            });
        }
    }
    function initGallerySlider() {
        var slider = document.querySelector(".product-detail__gallery__slider");
        if (!slider) return;
        var sliderProperties = {
            sliderTrack: slider.querySelector(".product-detail__gallery__slider__track"),
            sliderTrackSlides: slider.querySelectorAll(".product-detail__gallery__slider__track-slide"),
            sliderThumbnails: slider.querySelectorAll(".product-detail__gallery__slider__thumbnails-item"),
            prevBtn: slider.querySelector(".product-detail__gallery__slider__thumbnails-arrow--prev"),
            nextBtn: slider.querySelector(".product-detail__gallery__slider__thumbnails-arrow--next")
        };
        var activeIndex = 0;
        var thumbsArray = Array.prototype.slice.call(sliderProperties.sliderThumbnails);
        var foundIndex = -1;
        for (var i = 0; i < thumbsArray.length; i++) {
            if (thumbsArray[i].classList.contains("product-detail__gallery__slider__thumbnails-item--active")) {
                foundIndex = i;
                break;
            }
        }
        if (foundIndex !== -1) {
            activeIndex = foundIndex;
        }
        function updateActiveSlide() {
            for (var j = 0; j < sliderProperties.sliderTrackSlides.length; j++) {
                sliderProperties.sliderTrackSlides[j].classList.remove("product-detail__gallery__slider__track-slide--active");
            }
            sliderProperties.sliderTrackSlides[activeIndex].classList.add("product-detail__gallery__slider__track-slide--active");
        }
        function updateActiveThumbnail() {
            for (var k = 0; k < sliderProperties.sliderThumbnails.length; k++) {
                sliderProperties.sliderThumbnails[k].classList.remove("product-detail__gallery__slider__thumbnails-item--active");
            }
            sliderProperties.sliderThumbnails[activeIndex].classList.add("product-detail__gallery__slider__thumbnails-item--active");
        }
        function moveRightThumb() {
            if (activeIndex === sliderProperties.sliderThumbnails.length - 1) {
                activeIndex = 0;
            } else {
                activeIndex++;
            }
            updateActiveThumbnail();
            updateActiveSlide();
        }
        function moveLeftThumb() {
            if (activeIndex === 0) {
                activeIndex = sliderProperties.sliderThumbnails.length - 1;
            } else {
                activeIndex--;
            }
            updateActiveThumbnail();
            updateActiveSlide();
        }
        for (var t = 0; t < sliderProperties.sliderThumbnails.length; t++) {
            (function (idx) {
                sliderProperties.sliderThumbnails[idx].addEventListener("click", function () {
                    activeIndex = idx;
                    updateActiveThumbnail();
                    updateActiveSlide();
                });
            })(t);
        }
        if (sliderProperties.nextBtn) {
            sliderProperties.nextBtn.addEventListener("click", moveRightThumb);
        }
        if (sliderProperties.prevBtn) {
            sliderProperties.prevBtn.addEventListener("click", moveLeftThumb);
        }
        updateActiveSlide();
        updateActiveThumbnail();
    }
    function getQueryParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    window.initOpenProductInteractions = function() {
        initAdditionalTabs();
        initVideoEvents();
        initFooterSlider();
        initModal();
        initGallerySlider();
    };
    document.addEventListener("DOMContentLoaded", function () {
        var productId = getQueryParam("productId");
        console.log("Product ID:", productId);
        var loader = document.getElementById("loader");
        if (loader) {
            loader.style.display = "flex";
        }
        var galleryContainer = document.querySelector(".product-detail__gallery__slider");
        if (galleryContainer) {
            galleryContainer.innerHTML =
                '<div class="product-detail__gallery__slider__track"></div>' +
                '<div class="product-detail__gallery__slider__thumbnails">' +
                '<div class="product-detail__gallery__slider__thumbnails-arrow product-detail__gallery__slider__thumbnails-arrow--prev">Prev</div>' +
                '<div class="product-detail__gallery__slider__thumbnails-arrow product-detail__gallery__slider__thumbnails-arrow--next">Next</div>' +
                "</div>";
        }
        axios
            .get("/api/products/" + productId)
            .then(function (response) {
                var product = response.data.product;
                var similarProducts = response.data.similarProducts;
                if (loader) {
                    loader.style.display = "none";
                }
                var breadcrumbCurrent = document.querySelector(".product-detail__breadcrumb__current");
                if (breadcrumbCurrent && product.title) {
                    breadcrumbCurrent.textContent = product.title;
                }
                var galleryTrack = document.querySelector(".product-detail__gallery__slider__track");
                if (galleryTrack && product.images && product.images.length) {
                    var galleryHTML = "";
                    for (var i = 0; i < product.images.length; i++) {
                        var img = product.images[i];
                        galleryHTML +=
                            '<div class="product-detail__gallery__slider__track-slide' +
                            (i === 0 ? " product-detail__gallery__slider__track-slide--active" : "") +
                            '">' +
                            '<img src="/' + img + '" alt="Image ' + (i + 1) + ' for ' + product.title + '" class="product-detail__gallery__slider__track-slide-img">' +
                            "</div>";
                    }
                    galleryTrack.innerHTML = galleryHTML;
                }
                var thumbnailsContainer = document.querySelector(".product-detail__gallery__slider__thumbnails");
                if (thumbnailsContainer && product.images && product.images.length) {
                    var existingThumbs = thumbnailsContainer.querySelectorAll(".product-detail__gallery__slider__thumbnails-item");
                    Array.prototype.forEach.call(existingThumbs, function (thumb) {
                        thumb.parentNode.removeChild(thumb);
                    });
                    var nextArrow = thumbnailsContainer.querySelector(".product-detail__gallery__slider__thumbnails-arrow--next");
                    for (var ti = 0; ti < product.images.length; ti++) {
                        var thumbDiv = document.createElement("div");
                        thumbDiv.className =
                            "product-detail__gallery__slider__thumbnails-item" +
                            (ti === 0 ? " product-detail__gallery__slider__thumbnails-item--active" : "");
                        thumbDiv.innerHTML =
                            '<img src="/' + product.images[ti] + '" alt="Thumbnail ' + ti + '" class="product-detail__gallery__slider__thumbnails-item-img">';
                        if (nextArrow) {
                            thumbnailsContainer.insertBefore(thumbDiv, nextArrow);
                        } else {
                            thumbnailsContainer.appendChild(thumbDiv);
                        }
                    }
                }
                var productInfoEl = document.querySelector(".product-detail__info");
                if (productInfoEl) {
                    var infoHTML =
                        '<div class="product-detail__info__name">' +
                        '<h1 class="product-detail__info__name__title">' + product.title + "</h1>" +
                        "</div>" +
                        '<div class="product-detail__info__price-code">' +
                        '<h2 class="product-detail__info__price-code__price">' + product.price.new + "</h2>" +
                        '<h3 class="product-detail__info__price-code__sku">' +
                        '<span class="product-detail__info__price-code__sku__number">' + product.id + "</span><br>" +
                        "Sifra artikla" +
                        "</h3>" +
                        "</div>" +
                        '<div class="product-detail__info__general">' +
                        '<span class="product-detail__info__general__spec">' + product.description + "</span><br>";
                    if (product.specifications && product.specifications.features) {
                        for (var f = 0; f < product.specifications.features.length; f++) {
                            infoHTML +=
                                '<span class="product-detail__info__general__spec">• ' +
                                product.specifications.features[f] +
                                "</span><br>";
                        }
                    }
                    infoHTML += "</div>";
                    productInfoEl.innerHTML = infoHTML;
                }
                var similarContainer = document.getElementById("similarProductList");
                if (similarContainer && similarProducts && similarProducts.length) {
                    var similarHTML = "";
                    for (var j = 0; j < similarProducts.length; j++) {
                        similarHTML +=
                            '<div class="product-card">' +
                            '<img src="/' + similarProducts[j].mainImage + '" alt="' + similarProducts[j].title + '" class="product-card__image" />' +
                            '<div class="product-card__info">' +
                            '<h3 class="product-card__title">' + similarProducts[j].title + "</h3>" +
                            '<p class="product-card__description">' + similarProducts[j].description + "</p>" +
                            '<p class="product-card__price">' + similarProducts[j].price.new + "</p>" +
                            "</div>" +
                            "</div>";
                    }
                    similarContainer.innerHTML = similarHTML;
                } else {
                    console.log("No similar products found or container not found.");
                }
                if (product.tabs) {
                    var tabProductionList = document.getElementById("proizvodna-lista");
                    if (tabProductionList && product.tabs.productionList) {
                        tabProductionList.innerHTML =
                            '<ul class="product-detail__additional__tab-content__list">' +
                            '<li class="product-detail__additional__tab-content__list__item">' +
                            product.tabs.productionList.replace(/\n/g, "<br>") +
                            "</li>" +
                            "</ul>";
                    }
                    var tabGuide = document.getElementById("guide");
                    if (tabGuide && product.tabs.guide) {
                        tabGuide.innerHTML =
                            '<p class="product-detail__additional__tab-content__paragraph">' +
                            product.tabs.guide +
                            "</p>";
                    }
                    var tabRating = document.getElementById("rating");
                    if (tabRating && product.tabs.rating) {
                        var avg = product.tabs.rating.averageStars;
                        var votes = product.tabs.rating.votes;
                        var votesList = "";
                        if (votes && votes.length) {
                            for (var v = 0; v < votes.length; v++) {
                                votesList += "<li>" + votes[v].user + ": " + votes[v].stars + " stars</li>";
                            }
                        }
                        tabRating.innerHTML =
                            '<p class="product-detail__additional__tab-content__paragraph">' +
                            "Prosječna ocjena: " + avg + " / 5" +
                            "</p>" +
                            "<ul>" + votesList + "</ul>";
                    }
                    var tabEmail = document.getElementById("email");
                    if (tabEmail && product.tabs.email) {
                        tabEmail.innerHTML =
                            '<p class="product-detail__additional__tab-content__paragraph">' +
                            product.tabs.email +
                            "</p>";
                    }
                }
                initGallerySlider();
                window.initOpenProductInteractions && window.initOpenProductInteractions();
            })
            .catch(function (error) {
                console.error("An error occurred:", error);
                if (loader) {
                    loader.style.display = "none";
                }
            });
    });
    window.addEventListener("load", function () {
        var prevArrow = document.querySelector(".product-detail__gallery__slider__thumbnails-arrow--prev");
        var nextArrow = document.querySelector(".product-detail__gallery__slider__thumbnails-arrow--next");
        if (prevArrow) {
            prevArrow.innerHTML = "&lt;";
        }
        if (nextArrow) {
            nextArrow.innerHTML = "&gt;";
        }
    });
})();
