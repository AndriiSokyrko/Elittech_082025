const {Shop, Category, Flower, User} = require('../models');
const {Mode} = require("fs");
const {Model} = require("sequelize");
const path = require("path");

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

    async addFlower(req, res, next) {
        const {name, description, price,stock,shopId,categoryId}= req.body
        let imageUrl="";
        try {
            if (req.files?.avatarFile) {
                const { avatarFile } = req.files;
                const filePath = path.resolve(__dirname, '..', 'static', avatarFile.name);
                await avatarFile.mv(filePath);
                imageUrl=process.env.URL_PATH+'/'+ avatarFile.name
            }
            let flower = await Flower.create({name, description, price,stock,shopId,categoryId, imageUrl})
            res.status(200).json(flower);
        } catch (e) {
            next(e);
        }
    }
    async getFlowerById(req, res, next) {
        const id= req.params.id
        try {
            let flower  = await flower.findOne({where:{id}})

            res.status(200).json(flower );
        } catch (e) {
            next(e);
        }
    }
    async updateFlowerById(req, res, next) {
        const {id,name, description, price,stock,shopId,categoryId}= req.body


        try {
            const flowerId = Number(id);
            const flower = await Flower.findOne({ where: { id } });
            if (!flower) {
                return res.status(404).json({ message: "flower not found" });
            }

            await flower.update({id,name, description, price,stock,shopId,categoryId });

            if (req.files?.avatarFile) {
                const { avatarFile } = req.files;
                const filePath = path.resolve(__dirname, '..', 'static', avatarFile.name);
                await avatarFile.mv(filePath);
                const imageUrl=process.env.URL_PATH+'/'+ avatarFile.name
                flower.update({imageUrl})
            }
            res.status(200).json(flower);
        } catch (e) {
            next(e);
        }
    }

    async deleteFlowerById(req, res, next) {
        const id= req.params.id
        try {
            let flower  = await Flower.destroy({where:{id}})
            if (!flower) {
                return res.status(404).json({ message: "flower not found" });
            }
            res.status(200).json({message:"Ok", id});
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
