'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('handbooks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            title_en: {
                type: Sequelize.STRING
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'CategoryHandbooks',
                    key: 'id'
                }
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
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
            image: {
                type: Sequelize.BLOB('long')
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
        await queryInterface.dropTable('handbooks');
    }
};