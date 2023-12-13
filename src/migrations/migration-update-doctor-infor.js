module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('doctor_infor', 'count', {
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