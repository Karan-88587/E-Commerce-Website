const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/check-auth', AuthMiddleware, AuthController.checkAuth);

module.exports = router;