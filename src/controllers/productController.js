// src/controllers/productController.js
const path = require('path');
// koristimo require za products.json, pa se on kešira, što je ok za male fajlove
const data = require(path.join(__dirname, '..', 'models', 'products.json'));

exports.getAllProducts = (req, res) => {
    // renderuje index.handlebars i prosljeđuje proizvode iz json fajla
    res.render('index', { products: data.products });
};

exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    // tražimo proizvod sa odgovarajućim id-jem
    const product = data.products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).send('proizvod nije pronađen');
    }

    // renderuje openProduct.handlebars i prosljeđuje podatke o proizvodu
    res.render('openProduct', { product });
};
