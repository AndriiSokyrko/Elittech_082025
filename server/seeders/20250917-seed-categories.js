'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const categories = [
            'Розы', 'Тюльпаны', 'Орхидеи', 'Лилии', 'Ирисы', 'Гладиолусы', 'Василёк', 'Пионы',
            'Гвоздики', 'Нарциссы', 'Лаванда', 'Ромашки', 'Гортензии', 'Анёмоны', 'Азалии',
            'Жасмин', 'Астры', 'Каллы', 'Гиацинты', 'Камелии'
        ];

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
