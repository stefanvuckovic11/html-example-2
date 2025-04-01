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
    window.initAdditionalTabs = initAdditionalTabs;
    function initVideoEvents() {
        var videoBoxes = document.querySelectorAll(".product-detail__sidebar__video-box");
        if (videoBoxes.length) {
            videoBoxes.forEach(function (box) {
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
    window.initVideoEvents = initVideoEvents;
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
    window.initFooterSlider = initFooterSlider;
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
    window.initModal = initModal;
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
            activeIndex = (activeIndex + 1) % thumbsArray.length;
            updateActiveThumbnail();
            updateActiveSlide();
        }
        function moveLeftThumb() {
            activeIndex = (activeIndex - 1 + thumbsArray.length) % thumbsArray.length;
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
    window.initGallerySlider = initGallerySlider;
    function getQueryParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    window.initOpenProductInteractions = function () {
        window.initAdditionalTabs();
        window.initVideoEvents();
        window.initFooterSlider();
        window.initModal();
        window.initGallerySlider();
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
        axios.get("http://localhost:3000/products/" + productId)
            .then(function (response) {
                var product = response.data;
                axios.get("http://localhost:3000/products?type=" + product.type)
                    .then(function (similarResponse) {
                        var allSimilar = similarResponse.data;
                        var similarProducts = allSimilar.filter(function (p) {
                            return p.id !== product.id;
                        }).slice(0, 4);
                        product.similarProducts = similarProducts;
                        product.similarConfig = {
                            trapezoidColor: "#ccc",
                            headerText: "Slični proizvodi",
                            footerButtonText: "Pogledaj sve",
                            buttonBorderColor: "#ccc"
                        };
                        var productSource = document.getElementById("openProductTemplate").innerHTML;
                        var productTemplate = Handlebars.compile(productSource);
                        var productHTML = productTemplate({ product: product });
                        var mainSource = document.getElementById("mainLayoutTemplate").innerHTML;
                        var mainTemplate = Handlebars.compile(mainSource);
                        var finalHTML = mainTemplate({ title: "Product Details", body: productHTML });
                        document.getElementById("app").innerHTML = finalHTML;
                        if (loader) {
                            loader.style.display = "none";
                        }
                        if (window.initOpenProductInteractions) {
                            window.initOpenProductInteractions();
                        }
                    })
                    .catch(function (error) {
                        console.error("Error fetching similar products", error);
                        if (loader) {
                            loader.style.display = "none";
                        }
                    });
            })
            .catch(function (error) {
                console.error("Error fetching product", error);
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


var startTime = performance.now();
var loader = document.getElementById("loader");
Promise.all([
    axios.get("./views/partials/openProductLeft/productBreadcrumb.handlebars"),
    axios.get("./views/partials/openProductLeft/productGallery.handlebars"),
    axios.get("./views/partials/openProductLeft/productInfo.handlebars"),
    axios.get("./views/partials/openProductLeft/productAdditional.handlebars"),
    axios.get("./views/partials/openProductLeft/productSimilar.handlebars"),
    axios.get("./views/partials/openProductRight/sidebarVideo1.handlebars"),
    axios.get("./views/partials/openProductRight/sidebarVideo2.handlebars"),
    axios.get("./views/partials/openProductRight/sidebarNews.handlebars"),
    axios.get("./views/partials/general/productCard.handlebars"),
    axios.get("./views/layouts/main.handlebars"),
    axios.get("./views/partials/general/skeletonLoader.handlebars")
])
    .then(function (responses) {
        var breadcrumbRes     = responses[0];
        var galleryRes        = responses[1];
        var infoRes           = responses[2];
        var additionalRes     = responses[3];
        var similarRes        = responses[4];
        var video1Res         = responses[5];
        var video2Res         = responses[6];
        var newsRes           = responses[7];
        var productCardRes    = responses[8];
        var mainLayoutRes     = responses[9];
        var skeletonLoaderRes = responses[10];

        Handlebars.registerPartial("openProductLeft/productBreadcrumb", breadcrumbRes.data);
        Handlebars.registerPartial("openProductLeft/productGallery",     galleryRes.data);
        Handlebars.registerPartial("openProductLeft/productInfo",        infoRes.data);
        Handlebars.registerPartial("openProductLeft/productAdditional",  additionalRes.data);
        Handlebars.registerPartial("openProductLeft/productSimilar",     similarRes.data);
        Handlebars.registerPartial("openProductRight/sidebarVideo1",     video1Res.data);
        Handlebars.registerPartial("openProductRight/sidebarVideo2",     video2Res.data);
        Handlebars.registerPartial("openProductRight/sidebarNews",       newsRes.data);
        Handlebars.registerPartial("general/productCard",                productCardRes.data);
        Handlebars.registerPartial("main",                               mainLayoutRes.data);
        Handlebars.registerPartial("general/skeletonLoader",             skeletonLoaderRes.data);

        var params = new URLSearchParams(window.location.search);
        var productId = params.get("productId");

        axios.get("http://localhost:3000/products/" + productId)
            .then(function (productResponse) {
                var productData = productResponse.data;

                axios.get("http://localhost:3000/products?type=" + productData.type)
                    .then(function (similarResponse) {
                        var allSimilar = similarResponse.data;
                        var filteredSimilar = [];
                        for (var i = 0; i < allSimilar.length; i++) {
                            if (allSimilar[i].id !== productData.id) {
                                filteredSimilar.push(allSimilar[i]);
                            }
                        }
                        var similar = filteredSimilar.slice(0, 4);

                        productData.similarProducts = similar;
                        productData.similarConfig = {
                            trapezoidColor: "#ccc",
                            iconClass: "fa-thumbs-up",
                            headerText: "Slični proizvodi",
                            footerButtonText: "Pogledaj sve",
                            buttonBorderColor: "#ccc"
                        };

                        var productSource = document.getElementById("openProductTemplate").innerHTML;
                        var productTemplate = Handlebars.compile(productSource);
                        var productHTML = productTemplate({ product: productData });

                        var mainSource = document.getElementById("mainLayoutTemplate").innerHTML;
                        var mainTemplate = Handlebars.compile(mainSource);
                        var finalHTML = mainTemplate({
                            title: "Product Details",
                            body: productHTML
                        });

                        document.getElementById("app").innerHTML = finalHTML;

                        var gallerySkeletonRef    = document.getElementById("gallerySkeleton");
                        var galleryRealRef        = document.getElementById("realGalleryContainer");

                        var infoSkeletonRef       = document.getElementById("infoSkeleton");
                        var realInfoRef           = document.getElementById("realInfoContainer");

                        var additionalSkeletonRef = document.getElementById("additionalSkeleton");
                        var realAdditionalRef     = document.getElementById("realAdditionalContainer");

                        var similarSkeletonRef    = document.getElementById("similarSkeleton");
                        var realSimilarRef        = document.getElementById("realSimilarContainer");

                        var endTime = performance.now();
                        var fetchDuration = endTime - startTime;
                        var totalDuration = fetchDuration + 2000; // add 2 seconds

                        setTimeout(function () {
                            if (gallerySkeletonRef)    gallerySkeletonRef.style.display    = "none";
                            if (infoSkeletonRef)       infoSkeletonRef.style.display       = "none";
                            if (additionalSkeletonRef) additionalSkeletonRef.style.display = "none";
                            if (similarSkeletonRef)    similarSkeletonRef.style.display    = "none";

                            if (galleryRealRef)        galleryRealRef.style.display        = "block";
                            if (realInfoRef)           realInfoRef.style.display           = "block";
                            if (realAdditionalRef)     realAdditionalRef.style.display     = "block";
                            if (realSimilarRef)        realSimilarRef.style.display        = "block";

                            if (loader) {
                                loader.style.display = "none";
                            }

                            if (window.initOpenProductInteractions) {
                                window.initOpenProductInteractions();
                            }
                        }, totalDuration);
                    })
                    .catch(function (similarErr) {
                        console.error("Error fetching similar products:", similarErr);
                        if (loader) {
                            loader.style.display = "none";
                        }
                    });
            })
            .catch(function (prodErr) {
                console.error("Error fetching product:", prodErr);
                if (loader) {
                    loader.style.display = "none";
                }
            });
    })
    .catch(function (partialsErr) {
        console.error("Error fetching partials:", partialsErr);
        if (loader) {
            loader.style.display = "none";
        }
    });
