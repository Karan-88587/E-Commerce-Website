const router = require('express').Router();
const { upload } = require('../config/clodinary')
const ProductController = require('../controllers/ProductController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

// Ensure the client uploads images using the correct field name (images).
router.post('/create-product', AuthMiddleware, upload.array('images'), ProductController.addProduct);
router.get('/get-all-products', ProductController.getAllProducts);
router.get('/get-single-product/:productId', ProductController.getProduct);
router.put('/update-product/:productId', AuthMiddleware, upload.array('images'), ProductController.updateProduct);
router.delete('/delete-product/:productId', AuthMiddleware, ProductController.deleteProduct);

module.exports = router;