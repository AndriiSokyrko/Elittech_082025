const apiError = require("../error/apiErrors");
const { Role } = require("../models");

module.exports = async function (req, res, next) {
    try {
        // Проверяем, есть ли роли в базе
        const rolesCount = await Role.count();
        if (rolesCount === 0) {
            await Role.bulkCreate([
                { name: 'USER', description: 'Обычный пользователь' },
                { name: 'ADMIN', description: 'Администратор' },
                { name: 'SUPERADMIN', description: 'Главный админ' }
            ]);
        }
        next();
    } catch (e) {
        console.error("Error creating roles:", e);
        next(apiError.badRequest(e.message));
    }
};
