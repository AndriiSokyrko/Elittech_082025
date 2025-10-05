const {Category} = require('../models');
const {Mode} = require("fs");
const {Model} = require("sequelize");

class CategoryController {
      async getCategories(req, res, next) {
        try {
            const shops = await Category.findAndCountAll();
            res.status(200).json(shops);
        } catch (e) {
            next(e);
        }
    }
    async addCategory(req, res, next) {
        const {name}= req.body
        try {
            let category = await Category.create({name})

            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    }
    async getCategoryById(req, res, next) {
        const id= req.params.id
        try {
            let category  = await Category.findOne({where:{id}})

            res.status(200).json(category );
        } catch (e) {
            next(e);
        }
    }
    async updateCategoryById(req, res, next) {
        const { id, name } = req.body;

        try {
            const categoryId = Number(id);
            const category = await Category.findOne({ where: { id: categoryId } });
            if (!category) {
                return res.status(404).json({ message: "category not found" });
            }
            await category.update({ name});
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    }

    async deleteCategoryById(req, res, next) {
        const id= req.params.id
        try {
            let category  = await Category.destroy({where:{id}})
            if (!category) {
                return res.status(404).json({ message: "Shop not found" });
            }
            res.status(200).json({message:"Ok", id});
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new CategoryController();
