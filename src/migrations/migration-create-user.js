'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Allcodes',
          key: 'id'
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Allcodes',
          key: 'id'
        }
      },
      phonenumber: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Allcodes',
          key: 'id'
        }
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
    await queryInterface.dropTable('Users');
  }
};