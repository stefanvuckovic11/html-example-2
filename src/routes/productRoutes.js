var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductByIdApi);
router.get('/seeAll/:filter', productController.getProductsByFilter);


module.exports = router;
