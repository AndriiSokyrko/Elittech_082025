'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shops', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Shops');
  },
};
