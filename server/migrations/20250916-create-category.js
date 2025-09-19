'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Categories');
  },
};
