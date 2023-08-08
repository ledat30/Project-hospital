module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('specialties', 'name_en', {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn('specialties', 'descriptionHTML_En', {
                type: Sequelize.TEXT('long'),
            }),
            queryInterface.addColumn('specialties', 'descriptionMarkdown_En', {
                type: Sequelize.TEXT('long'),
            }),
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return Promise.all([
           
        ]);
    }
};