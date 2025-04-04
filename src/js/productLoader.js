function initProductLoader() {
    var loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";

    axios.get("http://localhost:3000/products")
        .then(function (response) {
            var data = response.data;

            data.forEach(function (product) {
                if (product.discount && product.price && product.price.old) {
                    var discount = parseFloat(product.discount.toString().replace(/[^\d.]/g, "").trim());
                    var oldPrice = parseFloat(product.price.old.toString().replace(/[^\d.]/g, "").trim());
                    if (!isNaN(discount) && !isNaN(oldPrice)) {
                        product.price.new = (oldPrice - (oldPrice * discount / 100)).toFixed(2);
                    } else {
                        product.price.new = product.price.old;
                    }
                } else if (product.price && product.price.old) {
                    product.price.new = product.price.old;
                }
            });

            setTimeout(function () {
                if (loader) loader.style.display = "none";
            }, 2000);

            var categories = {
                "hotOffer": "#hotOfferProductList",
                "action": "#actionProductList",
                "recommended": "#recommendedProductList",
                "new": "#newProductList",
                "sale": "#saleProductList"
            };

            var productTemplate = Handlebars.compile(document.getElementById("product-template").innerHTML);

            Object.keys(categories).forEach(function (key) {
                var containerSelector = categories[key];
                var filteredProducts = data.filter(function (product) {
                    return product.category === key;
                });

                filteredProducts.forEach(function (product) {
                    product.category = key;
                });

                loadSection(containerSelector, filteredProducts, productTemplate);
            });

            function loadSection(containerSelector, products, template) {
                var container = $(containerSelector);
                container.html('<div class="section-spinner"><img src="images/spinner.gif" alt="Loading..."></div>');

                setTimeout(function () {
                    container.empty();
                    if (products.length > 0) {
                        products.forEach(function (product) {
                            var html = template(product);
                            container.append(html);
                        });
                    }
                }, 2000);
            }
        })
        .catch(function (error) {
            console.error("Error loading products: ", error);
            if (loader) loader.style.display = "none";
        });
}

window.initProductLoader = initProductLoader;
