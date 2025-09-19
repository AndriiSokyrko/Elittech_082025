'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Flowers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      imageUrl: { type: Sequelize.STRING },
      stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      shopId: { type: Sequelize.INTEGER, references: { model: 'Shops', key: 'id' }, onDelete: 'CASCADE', allowNull: false },
      categoryId: { type: Sequelize.INTEGER, references: { model: 'Categories', key: 'id' }, onDelete: 'SET NULL' , allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Flowers');
  },
};

