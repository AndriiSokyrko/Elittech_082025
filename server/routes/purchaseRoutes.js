const Router = require('express');
const router = new Router();
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middleware/authMiddleware');

// Добавление покупки
router.post('/', purchaseController.addPurchase);

// Получение покупок авторизованного пользователя
router.get('/my', authMiddleware, purchaseController.getUserPurchases);

module.exports = router;
