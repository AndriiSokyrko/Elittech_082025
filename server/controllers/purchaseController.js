const {Purchase, PurchaseItem} = require('../models');

class PurchaseController {
    // Добавить новую покупку
    async addPurchase(req, res, next) {
        try {
            const {userId,userName, email, phone, address, totalPrice, orders} = req.body;

            if (!orders || !Array.isArray(orders) || orders.length === 0) {
                return res.status(400).json({message: 'Покупка должна содержать хотя бы один элемент'});
            }

            const purchase = await Purchase.create({
                userId,
                userName,
                email,
                phone,
                address,
                totalPrice,
            });
            // 2. Создаём связанные элементы в таблице PurchaseItems
            const purchaseItems = orders.map(item => ({
                ...item,
                purchaseId: purchase.id
            }));

            await PurchaseItem.bulkCreate(purchaseItems);
            // 3. Загружаем вместе с orders для ответа
            const result = await Purchase.findOne({
                where: {id: purchase.id},
                include: [{model: PurchaseItem, as: 'orders'}]
            });

            res.json(result);

        } catch (e) {
            next(e);
        }
    }


    // Получение архива покупок для авторизованного пользователя
    async getUserPurchases(req, res, next) {
        try {
            const userId = req.params.id;

            const purchases = await Purchase.findAll({
                where: {userId},
                include: [{model: PurchaseItem, as: 'orders'}],
                order: [['createdAt', 'DESC']]
            });

            res.json(purchases);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PurchaseController();
