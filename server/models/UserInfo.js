module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define('UserInfo', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: false},
        email: {type: DataTypes.STRING, unique: false},
        address: {type: DataTypes.STRING, allowNull: true},
        phone: {type: DataTypes.BIGINT, allowNull: true},
        description: {type: DataTypes.STRING, allowNull:true, defaultValue:''},
        avatarFile: {type: DataTypes.STRING, allowNull: true, defaultValue:'profile1.png'},
        userId: { type: DataTypes.INTEGER, allowNull: false },
    })


    UserInfo.associate = function(models) {
        UserInfo.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };



    return  UserInfo;
}
