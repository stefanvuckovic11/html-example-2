var path = require('path');
var data = require(path.join(__dirname, '..', 'models', 'products.json'));

exports.getAllProducts = function(req, res) {
    var products = data.products;
    var hotOffer = products.filter(function(p) {
        return p.category === "hot-offer";
    }).slice(0, 8);
    var action = products.filter(function(p) {
        return p.category === "action";
    }).slice(0, 8);
    var recommended = products.filter(function(p) {
        return p.category === "recommended";
    }).slice(0, 8);
    var newProducts = products.filter(function(p) {
        return p.category === "new";
    }).slice(0, 8);
    var sale = products.filter(function(p) {
        return p.category === "sale";
    }).slice(0, 8);

    res.json({
        hotOffer: hotOffer,
        action: action,
        recommended: recommended,
        new: newProducts,
        sale: sale
    });
};

exports.getProductByIdApi = function(req, res) {
    var productId = parseInt(req.params.id, 10);
    var product = data.products.find(function(p) {
        return p.id === productId;
    });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    var similarProducts = data.products.filter(function(p) {
        return p.type === product.type && p.id !== productId;
    }).slice(0, 4);

    res.json({ product: product, similarProducts: similarProducts });
};
