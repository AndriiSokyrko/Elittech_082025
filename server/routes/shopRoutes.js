const Router = require('express');
const router = new Router();
const shopController = require('../controllers/shopController');

// Получить все магазины
router.get('/', shopController.getShops);
router.post('/', shopController.addShop);
router.get('/:id', shopController.getShopById);
router.delete('/:id', shopController.deleteShopById);
router.patch('/:id', shopController.updateShopById);

module.exports = router;
