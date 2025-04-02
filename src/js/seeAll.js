var content = document.getElementById("app");
var allProducts = [];

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

    if (typeof initAccordion === "function") {
        initAccordion();
    }

    attachFilterListener();
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
        return axios.get("./views/partials/seeAllRight/filterBar.handlebars");
    })
    .then(function(res) {
        Handlebars.registerPartial("seeAllRight/filterBar", res.data);
        return axios.get("http://localhost:3000/products");
    })
    .then(function(response) {
        allProducts = response.data;
        var products = response.data;
        renderProducts(products);
    })
    .catch(function(err) {
        console.error("Error:", err);
    });

function attachFilterListener() {
    var applyBtn = document.getElementById("applyFilter");
    if (!applyBtn) return;

    applyBtn.addEventListener("click", function() {
        var sortType = document.getElementById("sortType").value;
        var minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
        var maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
        var filtered = allProducts.filter(function(product) {
            var price = parseFloat(product.price.new.replace(/[^0-9.]/g, ""));
            return price >= minPrice && price <= maxPrice;
        });

        switch (sortType) {
            case "priceAsc":
                filtered.sort(function(a, b) {
                    return parseFloat(a.price.new.replace(/[^0-9.]/g, "")) -
                        parseFloat(b.price.new.replace(/[^0-9.]/g, ""));
                });
                break;
            case "priceDesc":
                filtered.sort(function(a, b) {
                    return parseFloat(b.price.new.replace(/[^0-9.]/g, "")) -
                        parseFloat(a.price.new.replace(/[^0-9.]/g, ""));
                });
                break;
            case "nameAsc":
                filtered.sort(function(a, b) {
                    return a.title.localeCompare(b.title);
                });
                break;
            case "nameDesc":
                filtered.sort(function(a, b) {
                    return b.title.localeCompare(a.title);
                });
                break;
            default:
                break;
        }

        renderProducts(filtered);
    });
}
