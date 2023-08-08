module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('clinics', 'name_en', {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn('clinics', 'address_en', {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn('clinics', 'descriptionHTML_En', {
                type: Sequelize.TEXT('long'),
            }),
            queryInterface.addColumn('clinics', 'descriptionMarkdown_En', {
                type: Sequelize.TEXT('long'),
            }),
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return Promise.all([

        ]);
    }
};