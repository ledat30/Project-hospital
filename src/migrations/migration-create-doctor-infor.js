'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'specialties',
                    key: 'id'
                }
            },
            clinicId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'clinics',
                    key: 'id'
                }
            },
            priceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Allcodes',
                    key: 'id'
                }
            },
            provinceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Allcodes',
                    key: 'id'
                }
            },
            paymentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Allcodes',
                    key: 'id'
                }
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            addressClinic_en: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nameClinic_en: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            note: {
                type: Sequelize.STRING
            },
            note_en: {
                type: Sequelize.STRING
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            contentHTML_en: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown_en: {
                type: Sequelize.TEXT('long')
            },
            description: {
                type: Sequelize.TEXT('long')
            },
            description_en: {
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
        await queryInterface.dropTable('doctor_infor');
    }
};