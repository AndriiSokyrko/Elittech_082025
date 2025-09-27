const {Shop, Category, Flower, User} = require('../models');
const {Mode} = require("fs");
const {Model} = require("sequelize");

class ShopController {
      async getShops(req, res, next) {
        try {
            const shops = await Shop.findAndCountAll();
            res.status(200).json(shops);
        } catch (e) {
            next(e);
        }
    }
    async addShop(req, res, next) {
        const {name, address, phone}= req.body
        try {
            let shops = await Shop.create({name, address, phone})

            res.status(200).json(shops);
        } catch (e) {
            next(e);
        }
    }
    async getShopById(req, res, next) {
        const id= req.params.id
        try {
            let shop  = await User.findOne({where:{id}})

            res.status(200).json(shop );
        } catch (e) {
            next(e);
        }
    }
    async updateShopById(req, res, next) {
        const { id, name, address, phone } = req.body;

        try {
            const shopId = Number(id);
            const shop = await Shop.findOne({ where: { id: shopId } });
            if (!shop) {
                return res.status(404).json({ message: "Shop not found" });
            }
            await shop.update({ name, address, phone });
            res.status(200).json(shop);
        } catch (e) {
            next(e);
        }
    }

    async deleteShopById(req, res, next) {
        const id= req.params.id
        try {
            let shop  = await Shop.destroy({where:{id}})
            if (!shop) {
                return res.status(404).json({ message: "Shop not found" });
            }
            res.status(200).json({message:"Ok", id});
        } catch (e) {
            next(e);
        }
    }

}

module
    .exports = new ShopController();
