module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

    User.associate = function(models) {
        User.hasOne(models.UserInfo, { foreignKey: 'userId', as: 'info' });
        User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    };

 return User ;
}
