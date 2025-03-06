(function() {
    var sliderObj = {
        slider: document.querySelector('.slider'),
        track: null,
        slides: null,
        pagination: null,
        totalSlides: 0
    };

    if (sliderObj.slider) {
        sliderObj.track = sliderObj.slider.querySelector('.slider__track');
        sliderObj.slides = sliderObj.slider.querySelectorAll('.slider__slide');
        sliderObj.pagination = sliderObj.slider.querySelector('.slider__pagination');
        sliderObj.totalSlides = sliderObj.slides.length;

        sliderObj.pagination.innerHTML = '';

        for (var i = 0; i < sliderObj.totalSlides; i++) {
            var button = document.createElement('span');
            if (i === 0) {
                button.className = 'slider__pagination-item slider__pagination-item--active';
            } else {
                button.className = 'slider__pagination-item';
            }
            button.innerHTML = i + 1;
            button.dataset.index = i;

            button.onclick = function() {
                var index = parseInt(this.dataset.index, 10);
                sliderObj.track.style.transform = 'translateX(-' + (index * 100) + '%)';
                var buttons = sliderObj.pagination.children;
                for (var j = 0; j < buttons.length; j++) {
                    buttons[j].className = 'slider__pagination-item';
                }
                this.className = 'slider__pagination-item slider__pagination-item--active';
            };
            sliderObj.pagination.appendChild(button);
        }
    }
})();

(function() {
    var footerObj = {
        footerSlider: document.querySelector('.footer__slider'),
        sliderTrack: document.querySelector('.footer__slider-track'),
        prevBtn: document.querySelector('.footer__buttons__slider-prev'),
        nextBtn: document.querySelector('.footer__buttons__slider-next'),
        slideWidth: document.querySelector('.footer__slider-inner') ? document.querySelector('.footer__slider-inner').offsetWidth * 0.2 : 0,
        autoSlideInterval: null
    };

    if (footerObj.footerSlider) {
        footerObj.prevBtn.addEventListener('click', function() {
            footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
            footerObj.sliderTrack.style.transform = "translateX(-" + footerObj.slideWidth + "px)";
            footerObj.sliderTrack.addEventListener('transitionend', function handler() {
                footerObj.sliderTrack.appendChild(footerObj.sliderTrack.firstElementChild);
                footerObj.sliderTrack.style.transition = "none";
                footerObj.sliderTrack.style.transform = "translateX(0)";
                footerObj.sliderTrack.offsetHeight;
                footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
                footerObj.sliderTrack.addEventListener('transitionend', function innerHandler() {
                    console.log('prevBtn animation executed');
                });
                footerObj.sliderTrack.removeEventListener('transitionend', handler);
            });
        });

        footerObj.nextBtn.addEventListener('click', function() {
            footerObj.sliderTrack.style.transition = "none";
            footerObj.sliderTrack.insertBefore(footerObj.sliderTrack.lastElementChild, footerObj.sliderTrack.firstElementChild);
            footerObj.sliderTrack.style.transform = "translateX(-" + footerObj.slideWidth + "px)";
            footerObj.sliderTrack.offsetHeight;
            footerObj.sliderTrack.style.transition = "transform 0.2s ease-in-out";
            footerObj.sliderTrack.addEventListener('transitionend', function innerHandler() {
                console.log('nextBtn animation executed');
            });
            footerObj.sliderTrack.style.transform = "translateX(0)";
        });

        function updateStylesMediaQuery() {
            if (window.innerWidth <= 1300) {
                footerObj.prevBtn.style.opacity = '0';
                footerObj.nextBtn.style.opacity = '0';
                if (!footerObj.autoSlideInterval) {
                    footerObj.autoSlideInterval = setInterval(function() {
                        footerObj.prevBtn.click();
                    }, 1000);
                }
            } else {
                footerObj.prevBtn.style.opacity = '1';
                footerObj.nextBtn.style.opacity = '1';
                if (footerObj.autoSlideInterval) {
                    clearInterval(footerObj.autoSlideInterval);
                    footerObj.autoSlideInterval = null;
                }
            }
        }
        updateStylesMediaQuery();
        window.addEventListener('resize', updateStylesMediaQuery);
    }
})();

(function initBrandPromos() {
    var brandPromoObj = {
        brandPromos: document.querySelectorAll(".index__left__brand-promo"),
        closeAds: document.querySelectorAll(".index__left__brand-promo__commercial-close")
    };

    if (window.innerWidth <= 1300) {
        if (brandPromoObj.brandPromos[0]) {
            brandPromoObj.brandPromos[0].classList.add("index__left__brand-promo--visible");
        }
        if (brandPromoObj.brandPromos[1]) {
            setTimeout(function() {
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
})();

(function initAccordion() {
    var accordionObj = {
        container: document.querySelector('.index__left__accordion')
    };

    if (!accordionObj.container) {
        return;
    }

    accordionObj.mainHeader = accordionObj.container.querySelector('.index__left__accordion__header');
    accordionObj.mainCategories = accordionObj.container.querySelectorAll(':scope > .index__left__accordion__item');

    var initialState = window.innerWidth < 1240 ? 'none' : 'block';
    for (var i = 0; i < accordionObj.mainCategories.length; i++) {
        accordionObj.mainCategories[i].style.display = initialState;
    }

    accordionObj.mainHeader.addEventListener('click', function (e) {
        e.preventDefault();
        var areVisible = accordionObj.mainCategories.length > 0 &&
            getComputedStyle(accordionObj.mainCategories[0]).display !== 'none';
        for (var i = 0; i < accordionObj.mainCategories.length; i++) {
            accordionObj.mainCategories[i].style.display = areVisible ? 'none' : 'block';
        }
    });

    for (var i = 0; i < accordionObj.mainCategories.length; i++) {
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
        })(accordionObj.mainCategories[i]);
    }
})();

(function() {
    $.ajax({
        url: 'src/products.json',
        dataType: 'json', //ocekuju se podaci u json formatu

        success: function(data) { //funkcija se poziva ako je AJAX zahtjev successful
            //data odje sadrzi parsirane json podatke
            var hotOfferList = $('.index__right__hot-offer__product-list'); //ulazim u html element vruce ponude
            hotOfferList.empty(); //brisem sve node-ove i sadrzaj elementa
            //praznjenje hot-offer elementa
            if (data.hotOffer && data.hotOffer.length > 0) {
                //provjeravam ima li "HOT OFFER"a u preuzetom nizu i ima li taj niz makar jedan proizovd
                $.each(data.hotOffer, function (index, product) {
                    //koriscenjem $.each jquery metode prolazim kroz svaki element niza data.hotOffera

                    //index je trenutni indeks a product sadrzi podatke o tom proizvodu

                    //ubacanje elemenata iz json fajla u productHTML varijablu koja sluzi kao plejsholder i koja
                    //je enkapsulirana template literalima ``

                    //unutar template literala ubacaju se HTML elementi, a potrebnim podacima se pristupa
                    // ${objekat.kljuc} formatom
                    var productHTML = `
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
                    hotOfferList.append(productHTML); //guram sve ove promjene u productHTML
                });
            }
            var actionList = $('.index__right__action__product-list');
            actionList.empty();
            if (data.action && data.action.length > 0) {
                $.each(data.action, function(index, product) {
                    var productHTML = `
            <div class="index__right__action__product">
              <span class="index__right__action__product__discount">${product.discount}</span>
              <img src="${product.image}" alt="${product.title}" class="index__right__action__product__img">
              <h3 class="index__right__action__product__title">${product.title}</h3>
              <p class="index__right__action__product__timer">${product.timer}</p>
              <p class="index__right__action__product__price">
                <span class="index__right__action__product__old-price">${product.oldPrice}</span>
                <span class="index__right__action__product__new-price">${product.newPrice}</span>
              </p>
            </div>
          `;
                    actionList.append(productHTML);
                });
            }
            var recommendedList = $('.index__right__recommended__product-list');
            recommendedList.empty();
            if (data.recommended && data.recommended.length > 0) {
                $.each(data.recommended, function(index, product) {
                    var productHTML = `
            <div class="index__right__recommended__product">
              <span class="index__right__recommended__product__discount">${product.discount}</span>
              <img src="${product.image}" alt="${product.title}" class="index__right__recommended__product__img">
              <h3 class="index__right__recommended__product__title">${product.title}</h3>
              <p class="index__right__recommended__product__timer">${product.timer}</p>
              <p class="index__right__recommended__product__price">
                <span class="index__right__recommended__product__old-price">${product.oldPrice}</span>
                <span class="index__right__recommended__product__new-price">${product.newPrice}</span>
              </p>
            </div>
          `;
                    recommendedList.append(productHTML);
                });
            }
            var newList = $('.index__right__new__product-list');
            newList.empty();
            if (data.new && data.new.length > 0) {
                $.each(data.new, function(index, product) {
                    var productHTML = `
            <div class="index__right__new__product">
              <span class="index__right__new__product__discount">${product.discount}</span>
              <img src="${product.image}" alt="${product.title}" class="index__right__new__product__img">
              <h3 class="index__right__new__product__title">${product.title}</h3>
              <p class="index__right__new__product__timer">${product.timer}</p>
              <p class="index__right__new__product__price">
                <span class="index__right__new__product__old-price">${product.oldPrice}</span>
                <span class="index__right__new__product__new-price">${product.newPrice}</span>
              </p>
            </div>
          `;
                    newList.append(productHTML);
                });
            }

            //implementacija handlebarsa
            var saleList = $('.index__right__sale__product-list');
            saleList.empty();
            if (data.sale && data.sale.length > 0) {
                var saleTemplateRaw = document.getElementById('saleTemplate').innerHTML;
                var saleTemplate = Handlebars.compile(saleTemplateRaw);
                var saleHTML = saleTemplate({ sale: data.sale });
                saleList.append(saleHTML);
            }
        },
    });
})();

