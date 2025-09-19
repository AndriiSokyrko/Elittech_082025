const {Shop, Category, Flower} = require('../models');

class FlowerController {
    async getFlowers(req, res, next) {
        try {
            const {shopId, categoryId, limit} = req.query;
            const where = {};
            if (shopId) where.shopId = shopId;
            if (categoryId) where.categoryId = categoryId;

            const flowers = await Flower.findAndCountAll({
                where,
                limit: limit ? parseInt(limit) : undefined,
                include: [
                    { model: Shop, as: 'shop', attributes: ['name'] },
                    { model: Category, as: 'category', attributes: ['name'] }
                ],
            });

            res.json(flowers);
        } catch
            (e) {
            next(e);
        }
    }

    async getShops(req, res, next) {
        try {
            const shops = await Shop.findAndCountAll();
            res.json(shops);
        } catch (e) {
            next(e);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await Category.findAndCountAll();
            res.json(categories);
        } catch (e) {
            next(e);
        }
    }
}

module
    .exports = new FlowerController();
