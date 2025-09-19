'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.ENUM('USER', 'ADMIN', 'SUPERADMIN'),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        }
    }, {
        tableName: 'Roles',
        timestamps: true
    });

    Role.associate = function(models) {
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    };

    return Role;
};
