module.exports = (sequelize, DataTypes) => {
  const Flower = sequelize.define('Flower', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    imageUrl: DataTypes.STRING,
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Shop', key: 'shopId' },
      onDelete: 'CASCADE'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Category', key: 'categoryId' },
      onDelete: 'SET NULL'
    }
  }, {});

  Flower.associate = function(models) {
    Flower.belongsTo(models.Shop, { foreignKey: 'shopId', as: 'shop' });
    Flower.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  return Flower;
};
