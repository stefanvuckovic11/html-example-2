var content = document.getElementById("app");

function renderProducts(products) {
    var seeAllSource = document.getElementById("seeAllTemplate").innerHTML;
    var seeAllTemplate = Handlebars.compile(seeAllSource);
    var seeAllHTML = seeAllTemplate({ products: products });
    var mainSource = document.getElementById("mainLayoutTemplate").innerHTML;
    var mainTemplate = Handlebars.compile(mainSource);
    var finalHTML = mainTemplate({ title: "See All Products", body: seeAllHTML });
    content.innerHTML = finalHTML;
    var loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
}

axios.get("./views/layouts/main.handlebars")
    .then(function(res) {
        Handlebars.registerPartial("main", res.data);
        return axios.get("./views/partials/indexLeft/accordion.handlebars");
    })
    .then(function(res) {
        Handlebars.registerPartial("indexLeft/accordion", res.data);
        return axios.get("./views/partials/indexLeft/brandPromo.handlebars");
    })
    .then(function(res) {
        Handlebars.registerPartial("indexLeft/brandPromo", res.data);
        return axios.get("./views/partials/indexLeft/brandSearch.handlebars");
    })
    .then(function(res) {
        Handlebars.registerPartial("indexLeft/brandSearch", res.data);
        return axios.get("./views/partials/indexLeft/newsletter.handlebars");
    })
    .then(function(res) {
        Handlebars.registerPartial("indexLeft/newsletter", res.data);
        return axios.get("./views/partials/general/productCard.handlebars");
    })
    .then(function(res) {
        Handlebars.registerPartial("general/productCard", res.data);
        return Promise.resolve();
    })
    .then(function() {
        axios.get("http://localhost:3000/products")
            .then(function(response) {
                var products = response.data;
                var params = new URLSearchParams(window.location.search);
                var productId = params.get("productId");
                var typeParam = params.get("type");
                var section = params.get("section");

                if (productId) {
                    axios.get("http://localhost:3000/products/" + productId)
                        .then(function(productResponse) {
                            var currentType = productResponse.data.type;
                            products = products.filter(function(p) {
                                return p.type === currentType;
                            });
                            renderProducts(products);
                        })
                        .catch(function(error) {
                            console.error("Error fetching current product", error);
                            renderProducts(products);
                        });
                } else if (typeParam) {
                    products = products.filter(function(p) {
                        return p.type === typeParam;
                    });
                    renderProducts(products);
                } else if (section) {
                    if (section === "hot-offer") {
                        products = products.filter(function(p) {
                            return p.category === "hotOffer";
                        });
                    } else {
                        products = products.filter(function(p) {
                            return p.category === section;
                        });
                    }
                    renderProducts(products);
                } else {
                    renderProducts(products);
                }
            })
            .catch(function(error) {
                console.error("Error loading products", error);
                var loader = document.getElementById("loader");
                if (loader) {
                    loader.style.display = "none";
                }
            });
    })
    .catch(function(err) {
        console.error("Error loading partials", err);
    });
