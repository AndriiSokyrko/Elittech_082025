module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    roleId: { type: DataTypes.INTEGER },
})

    User.associate = function(models) {
        User.hasOne(models.UserInfo, { foreignKey: 'userId', as: 'userInfo' });
        User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'userRole' });
    };

 return User ;
}
