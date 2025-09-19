// models/PurchaseItem.js
'use strict';

module.exports = (sequelize, DataTypes) => {
    const PurchaseItem = sequelize.define('PurchaseItem', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        shopName: { type: DataTypes.STRING, allowNull: true },
        purchaseId: { type: DataTypes.INTEGER }
    }, {
        tableName: 'PurchaseItems',
        timestamps: true
    });

    PurchaseItem.associate = function(models) {
        PurchaseItem.belongsTo(models.Purchase, { foreignKey: 'purchaseId', as: 'purchase' });
    };

    return PurchaseItem;
};
