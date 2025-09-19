'use strict';

const faker = require('faker'); // Для генерации случайных данных

module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Создаем магазины
        const shops = [];
        for (let i = 1; i <= 5; i++) {
            shops.push({
                name: `Shop ${i}`,
                address: faker.address.streetAddress(),
                phone: faker.phone.number('+380 (##) ###-##-##'),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Shops', shops);

        // Получаем ID созданных магазинов
        const shopIds = shops.map((_, idx) => idx + 1);

        // 2. Создаем категории
        const categories = [];
        const categoryNames = ['Roses', 'Tulips', 'Lilies', 'Orchids', 'Daisies'];
        for (let i = 0; i < categoryNames.length; i++) {
            categories.push({
                name: categoryNames[i],
                shopId: shopIds[i % shopIds.length],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Categories', categories);

        // Получаем ID категорий
        const categoryIds = categories.map((_, idx) => idx + 1);

        // 3. Создаем цветы (не менее 20 записей)
        const flowers = [];
        const imageUrls = [
            'https://picsum.photos/200/300?random=1',
            'https://picsum.photos/200/300?random=2',
            'https://picsum.photos/200/300?random=3',
            'https://picsum.photos/200/300?random=4',
            'https://picsum.photos/200/300?random=5',
            'https://picsum.photos/200/300?random=6',
            'https://picsum.photos/200/300?random=7',
            'https://picsum.photos/200/300?random=8',
            'https://picsum.photos/200/300?random=9',
            'https://picsum.photos/200/300?random=10',
        ];

        for (let i = 1; i <= 20; i++) {
            flowers.push({
                name: `Flower ${i}`,
                description: faker.lorem.sentence(),
                price: (Math.random() * 50 + 5).toFixed(2),
                imageUrl: imageUrls[i % imageUrls.length],
                stock: Math.floor(Math.random() * 100),
                shopId: shopIds[i % shopIds.length],
                categoryId: categoryIds[i % categoryIds.length],
                createdAt: faker.date.past(1), // случайная дата за последний год
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Flowers', flowers);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Flowers', null, {});
        await queryInterface.bulkDelete('Categories', null, {});
        await queryInterface.bulkDelete('Shops', null, {});
    },
};
