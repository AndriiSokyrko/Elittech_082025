const Router = require('express');
const router = new Router();
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middleware/authMiddleware');

// Добавление покупки
router.post('/', purchaseController.addPurchase);

// Получение покупок авторизованного пользователя
router.get('/:id', purchaseController.getUserPurchases);

module.exports = router;
