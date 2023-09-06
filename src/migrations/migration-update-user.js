module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Users', 'reset_token', {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn('Users', 'expires_at', {
                type: Sequelize.DATE,
            }),
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return Promise.all([

        ]);
    }
};