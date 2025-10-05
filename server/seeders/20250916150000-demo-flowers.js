'use strict';

const flowersData=[
    {
        name: 'Красная роза',
        description: 'Красивая красная роза',
        price: 15.00,
        imageUrl: 'https://images.pexels.com/photos/1048275/pexels-photo-1048275.jpeg',
        stock: 50,
        shopId: 1,
        categoryId: 1,

    },
    {
        name: 'Желтый тюльпан',
        description: 'Яркий желтый тюльпан',
        price: 12.50,
        imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg',
        stock: 30,
        shopId: 1,
        categoryId: 2,

    },
    {
        name: 'Белая орхидея',
        description: 'Элегантная белая орхидея',
        price: 25.00,
        imageUrl: 'https://images.pexels.com/photos/570966/pexels-photo-570966.jpeg',
        stock: 20,
        shopId: 2,
        categoryId: 3,

    },
    {
        name: 'Розовый лилия',
        description: 'Нежная розовая лилия',
        price: 18.00,
        imageUrl: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg',
        stock: 15,
        shopId: 2,
        categoryId: 4,

    },
    {
        name: 'Фиолетовый ирис',
        description: 'Красивый фиолетовый ирис',
        price: 14.00,
        imageUrl: 'https://images.pexels.com/photos/1022926/pexels-photo-1022926.jpeg',
        stock: 25,
        shopId: 3,
        categoryId: 5,

    },
    {
        name: 'Оранжевый гладиолус',
        description: 'Яркий оранжевый гладиолус',
        price: 16.00,
        imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
        stock: 18,
        shopId: 3,
        categoryId: 6,

    },
    {
        name: 'Синий василек',
        description: 'Маленький синий василек',
        price: 10.00,
        imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        stock: 40,
        shopId: 4,
        categoryId: 7,

    },
    {
        name: 'Розовая пион',
        description: 'Роскошный розовый пион',
        price: 20.00,
        imageUrl: 'https://images.pexels.com/photos/1111146/pexels-photo-1111146.jpeg',
        stock: 22,
        shopId: 4,
        categoryId: 8,

    },
    {
        name: 'Красный гвоздика',
        description: 'Яркая красная гвоздика',
        price: 13.00,
        imageUrl: 'https://images.pexels.com/photos/1020329/pexels-photo-1020329.jpeg',
        stock: 35,
        shopId: 5,
        categoryId: 9,

    },
    {
        name: 'Белый нарцисс',
        description: 'Нежный белый нарцисс',
        price: 11.50,
        imageUrl: 'https://images.pexels.com/photos/1619311/pexels-photo-1619311.jpeg',
        stock: 28,
        shopId: 5,
        categoryId: 10,

    },
    {
        name: 'Лавандовый лаванда',
        description: 'Ароматная лаванда',
        price: 12.00,
        imageUrl: 'https://images.pexels.com/photos/974139/pexels-photo-974139.jpeg',
        stock: 32,
        shopId: 6,
        categoryId: 11,

    },
    {
        name: 'Желтая ромашка',
        description: 'Солнечная желтая ромашка',
        price: 9.00,
        imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg',
        stock: 45,
        shopId: 6,
        categoryId: 12,

    },
    {
        name: 'Сиреневая гортензия',
        description: 'Нежная сиреневая гортензия',
        price: 17.00,
        imageUrl: 'https://images.pexels.com/photos/457153/pexels-photo-457153.jpeg',
        stock: 20,
        shopId: 7,
        categoryId: 13,

    },
    {
        name: 'Красный анемон',
        description: 'Красивый красный анемон',
        price: 19.00,
        imageUrl: 'https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg',
        stock: 18,
        shopId: 7,
        categoryId: 14,

    },
    {
        name: 'Розовый азалия',
        description: 'Нежная розовая азалия',
        price: 16.50,
        imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
        stock: 25,
        shopId: 8,
        categoryId: 15,

    },
    {
        name: 'Белый жасмин',
        description: 'Ароматный белый жасмин',
        price: 21.00,
        imageUrl: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
        stock: 12,
        shopId: 8,
        categoryId: 16,

    },
    {
        name: 'Фиолетовая астра',
        description: 'Красивый фиолетовый астра',
        price: 13.50,
        imageUrl: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg',
        stock: 30,
        shopId: 9,
        categoryId: 17,

    },
    {
        name: 'Оранжевый калла',
        description: 'Элегантная оранжевая калла',
        price: 22.00,
        imageUrl: 'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg',
        stock: 14,
        shopId: 9,
        categoryId: 18,

    },
    {
        name: 'Синяя гиацинт',
        description: 'Яркий синий гиацинт',
        price: 15.50,
        imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        stock: 20,
        shopId: 10,
        categoryId: 19,

    },
    {
        name: 'Розовая камелия',
        description: 'Нежная розовая камелия',
        price: 18.50,
        imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg',
        stock: 15,
        shopId: 10,
        categoryId: 20,

    }
];

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        // Получаем ID всех магазинов
        const [shops] = await queryInterface.sequelize.query(
            `SELECT id as shopId FROM "Shops" ORDER BY id ASC`
        );

        // Получаем ID всех категорий
        const [categories] = await queryInterface.sequelize.query(
            `SELECT id as categoryId FROM "Categories" ORDER BY id ASC`
        );

        const flowers = flowersData.map((f, i) => {
            const randomShop = shops[Math.floor(Math.random() * shops.length)].shopId;
            const randomCategory = categories[Math.floor(Math.random() * categories.length)].categoryId;

            return {
                ...f,
                // shopId: randomShop,
                // categoryId: randomCategory,
                createdAt: new Date(now.getTime() + i * 60000),
                updatedAt: new Date(now.getTime() + i * 60000)
            };
        });

        await queryInterface.bulkInsert('Flowers', flowers, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Flowers', null, {});
    }
};