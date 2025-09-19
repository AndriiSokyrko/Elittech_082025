const Router = require('express');
const router = new Router();
const flowerController = require('../controllers/flowerController');

// Получить все магазины
router.get('/shops', flowerController.getShops);

// Получить все категории
router.get('/categories', flowerController.getCategories);

// Получить цветы с фильтром и лимитом
router.get('/', flowerController.getFlowers);

module.exports = router;
