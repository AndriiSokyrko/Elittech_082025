'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const categories = [
            "Ко дню рождения",
            "К юбилею",
            "К свадьбе",
            "К годовщине",
            "К выпускному",
            "Для мамы",
            "Для папы",
            "Для подруги",
            "Для любимой",
            "Для коллеги",
            "Для учителя",
            "Без повода",
            "Для извинений",
            "Для поздравлений",
            "Для свидания",
            "Для дома",
            "Премиум букеты",
            "Авторские композиции",
            "Моно-букеты",
            "Корзины с цветами"
        ]
        await queryInterface.bulkInsert('Categories', categories.map((name, i) => ({
            name,
            createdAt: new Date(now.getTime() + i * 60000),
            updatedAt: new Date(now.getTime() + i * 60000),
        })), {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    }
};
