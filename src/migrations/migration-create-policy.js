'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Policies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameVI: {
                type: Sequelize.STRING
            },
            nameEN: {
                type: Sequelize.STRING
            },
            contentHTMLVi: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdownVi: {
                type: Sequelize.TEXT('long')
            },
            contentHTMLEn: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdownEn: {
                type: Sequelize.TEXT('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Policies');
    }
};