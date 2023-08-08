'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Handbook.belongsTo(models.CategoryHandbook, { foreignKey: 'categoryId' })
        }
    };
    Handbook.init({
        title: DataTypes.STRING,
        title_en: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        contentHTMLVi: DataTypes.TEXT('long'),
        contentMarkdownVi: DataTypes.TEXT('long'),
        contentHTMLEn: DataTypes.TEXT('long'),
        contentMarkdownEn: DataTypes.TEXT('long'),
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    return Handbook;
};