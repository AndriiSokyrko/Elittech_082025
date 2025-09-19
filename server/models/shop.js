'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
  }, {});

  Shop.associate = function(models) {
    Shop.hasMany(models.Flower, { foreignKey: 'shopId', as: 'flowers' });
    Shop.hasMany(models.Category, { foreignKey: 'shopId', as: 'categories' });
  };

  return Shop;
};
