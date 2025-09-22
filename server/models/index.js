const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Category = require('./Category')(sequelize, DataTypes);
const Shop = require('./Shop')(sequelize, DataTypes);
const Flower = require('./Flower')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const UserInfo = require('./UserInfo')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);
const Purchase = require('./Purchase')(sequelize, DataTypes);
const PurchaseItem = require('./PurchaseItem')(sequelize, DataTypes);

// Ассоциации
[Category, Shop, Flower, Purchase,PurchaseItem, User,UserInfo, Role].forEach(model => {
  if (model.associate) {
    model.associate({ Category, Shop, Flower, Purchase,PurchaseItem,User,UserInfo,Role });
  }
});

module.exports = {
  sequelize,
  Category,
  Shop,
  Flower,
  User,
  UserInfo,
  Role,
  Purchase,
  PurchaseItem,
};
