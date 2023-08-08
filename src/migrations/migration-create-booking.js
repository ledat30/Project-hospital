'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            statusId: {
                type: Sequelize.STRING,
                allowNull: false,
                // references: {
                //     model: 'Allcodes',
                //     key: 'id'
                // }
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: 'Users',
                //     key: 'id'
                // }
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: 'Users',
                //     key: 'id'
                // }
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('bookings');
    }
};