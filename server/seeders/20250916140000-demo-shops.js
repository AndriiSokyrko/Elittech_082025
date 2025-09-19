'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const shops = [
            { name: 'FlowerShop Kyiv', address: 'Kyiv, Shevchenko 1', phone: '+380441112233' },
            { name: 'FlowerShop Lviv', address: 'Lviv, Freedom Square 2', phone: '+380321112233' },
            { name: 'FlowerShop Odessa', address: 'Odessa, Deribasovskaya 10', phone: '+380482112233' },
            { name: 'FlowerShop Kharkiv', address: 'Kharkiv, Sumskaya 5', phone: '+380572112233' },
            { name: 'FlowerShop Dnipro', address: 'Dnipro, Central St. 3', phone: '+380562112233' },
            { name: 'FlowerShop Zaporizhzhia', address: 'Zaporizhzhia, Main St. 7', phone: '+380612112233' },
            { name: 'FlowerShop Ivano-Frankivsk', address: 'Ivano-Frankivsk, Market St. 1', phone: '+380342112233' },
            { name: 'FlowerShop Chernihiv', address: 'Chernihiv, Central St. 8', phone: '+380462112233' },
            { name: 'FlowerShop Vinnytsia', address: 'Vinnytsia, Main St. 5', phone: '+380432112233' },
            { name: 'FlowerShop Poltava', address: 'Poltava, Central St. 2', phone: '+380532112233' }
        ];

        await queryInterface.bulkInsert('Shops', shops.map((s, i) => ({
            ...s,
            createdAt: new Date(now.getTime() + i * 60000),
            updatedAt: new Date(now.getTime() + i * 60000),
        })), {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Shops', null, {});
    }
};
