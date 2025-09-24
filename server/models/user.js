module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    roleId: { type: DataTypes.INTEGER , allowNull: false},
})

    User.associate = function(models) {
        User.hasOne(models.UserInfo, { foreignKey: 'userId', as: 'userInfo' });
        User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'userRole' });
        User.hasMany(models.Purchase, {foreignKey:'userId',as:'purchases'})
    };

 return User ;
}
