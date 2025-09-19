module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define('UserInfo', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        description: {type: DataTypes.STRING, allowNull:true, defaultValue:''},
        img: {type: DataTypes.STRING, allowNull: true, defaultValue:'profile1.png'},
        adress: {type: DataTypes.STRING, allowNull: true},
        phone: {type: DataTypes.BIGINT, allowNull: true},
        email: {type: DataTypes.STRING, unique: false},
        userId: { type: DataTypes.INTEGER, allowNull: false },
    })


    UserInfo.associate = function(models) {
        UserInfo.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };



    return  UserInfo;
}
