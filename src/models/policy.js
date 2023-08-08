'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Policy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Policy.init({
        nameVI: DataTypes.STRING,
        nameEN: DataTypes.STRING,
        contentHTMLVi: DataTypes.TEXT('long'),
        contentMarkdownVi: DataTypes.TEXT('long'),
        contentHTMLEn: DataTypes.TEXT('long'),
        contentMarkdownEn: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Policy',
    });
    return Policy;
};