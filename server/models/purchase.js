// models/Purchase.js
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('Purchase', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        userId:{type:DataTypes.INTEGER,allowNull: false}
    }, {
        tableName: 'Purchases',
        timestamps: true
    });

    Purchase.associate = function(models) {
        Purchase.hasMany(models.PurchaseItem, { foreignKey: 'purchaseId', as: 'orders' });
        Purchase.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Purchase;
};
