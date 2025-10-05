const Router = require('express');
const router = new Router();
const flowerController = require('../controllers/flowerController');


// Получить цветы с фильтром и лимитом
router.get('/', flowerController.getFlowers);
router.post('/', flowerController.addFlower);
router.get('/:id', flowerController.getFlowerById);
router.delete('/:id', flowerController.deleteFlowerById);
router.patch('/:id', flowerController.updateFlowerById);
module.exports = router;
