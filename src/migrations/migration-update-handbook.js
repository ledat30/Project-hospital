module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('handbooks', 'count', {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }),
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return Promise.all([

        ]);
    }
};