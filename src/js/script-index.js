function initSlider() {
    var sliderObj = {
        slider: document.querySelector(".slider"),
        track: null,
        slides: null,
        pagination: null,
        totalSlides: 0
    };

    if (sliderObj.slider) {
        sliderObj.track = sliderObj.slider.querySelector(".slider__track");
        sliderObj.slides = sliderObj.slider.querySelectorAll(".slider__slide");
        sliderObj.pagination = sliderObj.slider.querySelector(".slider__pagination");
        sliderObj.totalSlides = sliderObj.slides.length;

        sliderObj.pagination.innerHTML = "";

        for (var i = 0; i < sliderObj.totalSlides; i++) {
            var button = document.createElement("span");
            button.className = (i === 0)
                ? "slider__pagination-item slider__pagination-item--active"
                : "slider__pagination-item";
            button.innerHTML = i + 1;
            button.dataset.index = i;

            button.onclick = function () {
                var index = parseInt(this.dataset.index, 10);
                sliderObj.track.style.transform = "translateX(-" + index * 100 + "%)";
                var buttons = sliderObj.pagination.children;
                for (var j = 0; j < buttons.length; j++) {
                    buttons[j].className = "slider__pagination-item";
                }
                this.className = "slider__pagination-item slider__pagination-item--active";
            };
            sliderObj.pagination.appendChild(button);
        }
    }
}

function initFooterSlider() {
    var footerObj = {
        footerSlider: document.querySelector(".footer__slider"),
        sliderTrack: document.querySelector(".footer__slider-track"),
        prevBtn: document.querySelector(".footer__buttons__slider-prev"),
        nextBtn: document.querySelector(".footer__buttons__slider-next"),
        slideWidth: document.querySelector(".footer__slider-inner")
            ? document.querySelector(".footer__slider-inner").offsetWidth * 0.2
            : 0,
        autoSlideInterval: null
    };

    if (footerObj.footerSlider) {
        footerObj.prevBtn.addEventListener("click", function () {
            footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
            footerObj.sliderTrack.style.transform = "translateX(-" + footerObj.slideWidth + "px)";
            footerObj.sliderTrack.addEventListener("transitionend", function handler() {
                footerObj.sliderTrack.appendChild(footerObj.sliderTrack.firstElementChild);
                footerObj.sliderTrack.style.transition = "none";
                footerObj.sliderTrack.style.transform = "translateX(0)";
                footerObj.sliderTrack.offsetHeight;
                footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
                footerObj.sliderTrack.removeEventListener("transitionend", handler);
            });
        });

        footerObj.nextBtn.addEventListener("click", function () {
            footerObj.sliderTrack.style.transition = "none";
            footerObj.sliderTrack.insertBefore(
                footerObj.sliderTrack.lastElementChild,
                footerObj.sliderTrack.firstElementChild
            );
            footerObj.sliderTrack.style.transform = "translateX(-" + footerObj.slideWidth + "px)";
            footerObj.sliderTrack.offsetHeight;
            footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
            footerObj.sliderTrack.style.transform = "translateX(0)";
        });

        function updateStylesMediaQuery() {
            if (window.innerWidth <= 1300) {
                footerObj.prevBtn.style.opacity = "0";
                footerObj.nextBtn.style.opacity = "0";
                if (!footerObj.autoSlideInterval) {
                    footerObj.autoSlideInterval = setInterval(function () {
                        footerObj.prevBtn.click();
                    }, 1000);
                }
            } else {
                footerObj.prevBtn.style.opacity = "1";
                footerObj.nextBtn.style.opacity = "1";
                if (footerObj.autoSlideInterval) {
                    clearInterval(footerObj.autoSlideInterval);
                    footerObj.autoSlideInterval = null;
                }
            }
        }
        updateStylesMediaQuery();
        window.addEventListener("resize", updateStylesMediaQuery);
    }
}

function initBrandPromos() {
    var brandPromoObj = {
        brandPromos: document.querySelectorAll(".index__left__brand-promo"),
        closeAds: document.querySelectorAll(".index__left__brand-promo__commercial-close")
    };

    if (window.innerWidth <= 1300) {
        if (brandPromoObj.brandPromos[0]) {
            brandPromoObj.brandPromos[0].classList.add("index__left__brand-promo--visible");
        }
        if (brandPromoObj.brandPromos[1]) {
            setTimeout(function () {
                brandPromoObj.brandPromos[1].classList.add("index__left__brand-promo--visible");
            }, 15000);
        }
    }

    for (var i = 0; i < brandPromoObj.brandPromos.length; i++) {
        if (brandPromoObj.closeAds[i]) {
            brandPromoObj.closeAds[i].addEventListener("click", function (event) {
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
}
const content = document.getElementById("app");

axios.get("views/layouts/main.handlebars")
    .then(res => {
        Handlebars.registerPartial("main", res.data);
        return axios.get("views/partials/indexLeft/accordion.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexLeft/accordion", res.data);
        return axios.get("views/partials/indexLeft/brandPromo.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexLeft/brandPromo", res.data);
        return axios.get("views/partials/indexLeft/brandSearch.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexLeft/brandSearch", res.data);
        return axios.get("views/partials/indexLeft/newsletter.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexLeft/newsletter", res.data);
        return axios.get("views/partials/indexLeft/productCard.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexLeft/productCard", res.data);
        return axios.get("views/partials/indexRight/slider.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexRight/slider", res.data);
        return axios.get("views/partials/indexRight/previewPartial.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexRight/previewPartial", res.data);
        return axios.get("views/partials/indexRight/brandSearchRight.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexRight/brandSearchRight", res.data);
        return axios.get("views/partials/indexRight/newsletterRight.handlebars");
    })
    .then(res => {
        Handlebars.registerPartial("indexRight/newsletterRight", res.data);
        const indexSource = document.getElementById("indexTemplate").innerHTML;
        const indexTemplate = Handlebars.compile(indexSource);
        const indexHTML = indexTemplate({});
        const mainSource = document.getElementById("mainLayoutTemplate").innerHTML;
        const mainTemplate = Handlebars.compile(mainSource);
        const finalHTML = mainTemplate({ title: "Example App", body: indexHTML });
        content.innerHTML = finalHTML;
        window.initIndexScripts();
        window.initAccordion();
        window.initProductLoader();
    })
    .catch(err => {
        console.error("greska u ucitavanju parsala", err);
    });


window.initIndexScripts = function() {
    initSlider();
    initFooterSlider();
    initBrandPromos();
};
var npSource = document.getElementById("new-product-template").innerHTML;
var npTemplate = Handlebars.compile(npSource);
var npHTML = npTemplate({});
document.body.insertAdjacentHTML('beforeend', npHTML);

document.addEventListener("DOMContentLoaded", function () {
    var loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
        if (loggedInUser.privilege === "admin") {
            var cheatCode = "admin";
            var inputSequence = "";
            document.addEventListener("keydown", function (e) {
                inputSequence += e.key.toLowerCase();
                console.log("Key pressed: " + e.key.toLowerCase() + ", sequence: " + inputSequence);
                if (inputSequence.length >= cheatCode.length) {
                    var recentSequence = inputSequence.substr(-cheatCode.length);
                    if (recentSequence === cheatCode) {
                        openNewProductPopup();
                        inputSequence = "";
                    }
                }
                if (inputSequence.length > 10) {
                    inputSequence = inputSequence.substr(-10);
                }
            });
        }
    }

    function openNewProductPopup() {
        var popup = document.querySelector(".new-product");
        if (popup) {
            popup.classList.remove("new-product--hidden");
            console.log("New product popup opened.");
        } else {
            console.error("New product popup element not found.");
        }
    }

    var closeBtn = document.querySelector(".new-product__close");
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            var popup = document.querySelector(".new-product");
            if (popup) {
                popup.classList.add("new-product--hidden");
                console.log("New product popup closed.");
            }
        });
    }

    function processField(fieldId) {
        var value = document.getElementById(fieldId).value.trim();
        return (value === "/") ? null : value;
    }
    var newProductForm = document.querySelector(".new-product__form");
    if (newProductForm) {
        newProductForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var title = processField("product-title");
            var category = processField("product-category");
            var discount = processField("product-discount");
            var type = processField("product-type");
            var mainImage = processField("product-mainImage");
            var imagesStr = processField("product-images");
            var description = processField("product-description");
            var timer = processField("product-timer");
            var priceOld = processField("product-price-old");
            var priceNew = processField("product-price-new");
            var brand = processField("product-brand");

            var dimensions = processField("product-dimensions");
            var capacity = processField("product-capacity");
            var energyRating = processField("product-energyRating");
            var featuresStr = processField("product-features");
            var relatedProductsStr = processField("product-relatedProducts");
            var productionList = processField("product-productionList");
            var guide = processField("product-guide");
            var email = processField("product-email");

            if (!title || !category) {
                alert("Molimo, popunite obavezna polja (naziv i kategorija).");
                return;
            }
            var images = imagesStr ? imagesStr.split(",").map(function(item) { return item.trim(); }) : [];
            var features = featuresStr ? featuresStr.split(",").map(function(item) { return item.trim(); }) : [];
            var relatedProducts = relatedProductsStr ? relatedProductsStr.split(",").map(function(item) { return parseInt(item.trim(), 10); }) : [];

            var newProduct = {
                title: title,
                category: category,
                discount: discount,
                type: type,
                mainImage: mainImage,
                images: images,
                description: description,
                timer: timer,
                price: {
                    old: priceOld,
                    new: priceNew
                },
                brand: brand,
                specifications: {
                    dimensions: dimensions,
                    capacity: capacity,
                    energyRating: energyRating,
                    features: features
                },
                reviews: [],
                relatedProducts: relatedProducts,
                tabs: {
                    productionList: productionList,
                    guide: guide,
                    email: email
                }
            };

            console.log("New product data:", newProduct);

            var xhrPost = new XMLHttpRequest();
            xhrPost.open("POST", "http://localhost:3000/products", true);
            xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhrPost.onreadystatechange = function () {
                if (xhrPost.readyState === 4) {
                    if (xhrPost.status >= 200 && xhrPost.status < 300) {
                        alert("Novi proizvod je uspješno dodat!");
                        newProductForm.reset();
                        var popup = document.querySelector(".new-product");
                        if (popup) {
                            popup.classList.add("new-product--hidden");
                        }
                    } else {
                        alert("Došlo je do greške prilikom dodavanja proizvoda.");
                    }
                }
            };
            xhrPost.send(JSON.stringify(newProduct));
        });
    }
});

