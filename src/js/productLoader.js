function initProductLoader() {
    var loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "flex";
    }

    axios.get("http://localhost:3000/products")
        .then(function(response) {
            var data = response.data;

            data.forEach(function(product) {
                if (product.discount && product.price && product.price.old) {
                    var discountStr = product.discount
                        .toString()
                        .replace(/[^\d.]/g, '')
                        .trim();
                    var discountValue = parseFloat(discountStr);

                    var oldPriceStr = product.price.old
                        .toString()
                        .replace(/[^\d.]/g, '')
                        .trim();
                    var oldPrice = parseFloat(oldPriceStr);

                    if (!isNaN(discountValue) && !isNaN(oldPrice)) {
                        var newPrice = oldPrice - (oldPrice * discountValue / 100);
                        product.price.new = newPrice.toFixed(2);
                    } else {
                        product.price.new = product.price.old;
                    }
                }
                else if (product.price && product.price.old) {
                    product.price.new = product.price.old;
                }
            });

            setTimeout(function() {
                if (loader) {
                    loader.style.display = "none";
                }
            }, 2000);

            var hotOffer = data.filter(function(product) {
                return product.category === "hotOffer";
            });
            var action = data.filter(function(product) {
                return product.category === "action";
            });
            var recommended = data.filter(function(product) {
                return product.category === "recommended";
            });
            var newProducts = data.filter(function(product) {
                return product.category === "new";
            });
            var sale = data.filter(function(product) {
                return product.category === "sale";
            });

            function loadSection(containerSelector, products, buildHTML) {
                var container = $(containerSelector);
                container.html('<div class="section-spinner"><img src="images/spinner.gif" alt="Loading..."></div>');
                setTimeout(function() {
                    container.empty();
                    if (products.length > 0) {
                        products.forEach(function(product) {
                            container.append(buildHTML(product));
                        });
                    }
                }, 2000);
            }

            var buildHotOfferHTML = function(product) {
                return '<div class="index__right__hot-offer__product">' +
                    '<span class="index__right__hot-offer__product__discount">' + product.discount + '</span>' +
                    '<a href="openProduct.html?productId=' + product.id + '">' +
                    '<img src="' + product.mainImage + '" alt="' + product.title + '" class="index__right__hot-offer__product__img">' +
                    '<h3 class="index__right__hot-offer__product__title">' + product.title + '</h3>' +
                    "</a>" +
                    '<p class="index__right__hot-offer__product__timer">' + product.timer + "</p>" +
                    '<p class="index__right__hot-offer__product__price">' +
                    '<span class="index__right__hot-offer__product__old-price">' + product.price.old + "</span>" +
                    '<span class="index__right__hot-offer__product__new-price">' + product.price.new + "</span>" +
                    "</p>" +
                    "</div>";
            };

            var buildActionHTML = function(product) {
                return '<div class="index__right__action__product">' +
                    '<span class="index__right__action__product__discount">' + product.discount + '</span>' +
                    '<a href="openProduct.html?productId=' + product.id + '">' +
                    '<img src="' + product.mainImage + '" alt="' + product.title + '" class="index__right__action__product__img">' +
                    '<h3 class="index__right__action__product__title">' + product.title + '</h3>' +
                    "</a>" +
                    '<p class="index__right__action__product__timer">' + product.timer + "</p>" +
                    '<p class="index__right__action__product__price">' +
                    '<span class="index__right__action__product__old-price">' + product.price.old + "</span>" +
                    '<span class="index__right__action__product__new-price">' + product.price.new + "</span>" +
                    "</p>" +
                    "</div>";
            };

            var buildRecommendedHTML = function(product) {
                return '<div class="index__right__recommended__product">' +
                    '<span class="index__right__recommended__product__discount">' + product.discount + '</span>' +
                    '<a href="openProduct.html?productId=' + product.id + '">' +
                    '<img src="' + product.mainImage + '" alt="' + product.title + '" class="index__right__recommended__product__img">' +
                    '<h3 class="index__right__recommended__product__title">' + product.title + '</h3>' +
                    "</a>" +
                    '<p class="index__right__recommended__product__timer">' + product.timer + "</p>" +
                    '<p class="index__right__recommended__product__price">' +
                    '<span class="index__right__recommended__product__old-price">' + product.price.old + "</span>" +
                    '<span class="index__right__recommended__product__new-price">' + product.price.new + "</span>" +
                    "</p>" +
                    "</div>";
            };

            var buildNewHTML = function(product) {
                return '<div class="index__right__new__product">' +
                    '<span class="index__right__new__product__discount">' + product.discount + '</span>' +
                    '<a href="openProduct.html?productId=' + product.id + '">' +
                    '<img src="' + product.mainImage + '" alt="' + product.title + '" class="index__right__new__product__img">' +
                    '<h3 class="index__right__new__product__title">' + product.title + '</h3>' +
                    "</a>" +
                    '<p class="index__right__new__product__timer">' + product.timer + "</p>" +
                    '<p class="index__right__new__product__price">' +
                    '<span class="index__right__new__product__old-price">' + product.price.old + "</span>" +
                    '<span class="index__right__new__product__new-price">' + product.price.new + "</span>" +
                    "</p>" +
                    "</div>";
            };

            var buildSaleHTML = function(product) {
                return '<div class="index__right__sale__product">' +
                    '<span class="index__right__sale__product__discount">' + product.discount + '</span>' +
                    '<a href="openProduct.html?productId=' + product.id + '">' +
                    '<img src="' + product.mainImage + '" alt="' + product.title + '" class="index__right__sale__product__img">' +
                    '<h3 class="index__right__sale__product__title">' + product.title + '</h3>' +
                    "</a>" +
                    '<p class="index__right__sale__product__timer">' + product.timer + "</p>" +
                    '<p class="index__right__sale__product__price">' +
                    '<span class="index__right__sale__product__old-price">' + product.price.old + "</span>" +
                    '<span class="index__right__sale__product__new-price">' + product.price.new + "</span>" +
                    "</p>" +
                    "</div>";
            };

            loadSection("#hot-offerProductList", hotOffer, buildHotOfferHTML);
            loadSection("#actionProductList", action, buildActionHTML);
            loadSection("#recommendedProductList", recommended, buildRecommendedHTML);
            loadSection("#newProductList", newProducts, buildNewHTML);
            loadSection("#saleProductList", sale, buildSaleHTML);
        })
        .catch(function(error) {
            console.error("Error loading products: ", error);
            if (loader) {
                loader.style.display = "none";
            }
        });
}

window.initProductLoader = initProductLoader;
