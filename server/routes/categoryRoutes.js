const Router = require('express');
const router = new Router();
const shopController = require('../controllers/categoryController');

// Получить все магазины
router.get('/', shopController.getCategories);
router.post('/', shopController.addCategory);
router.get('/:id', shopController.getCategoryById);
router.delete('/:id', shopController.deleteCategoryById);
router.patch('/:id', shopController.updateCategoryById);

module.exports = router;
