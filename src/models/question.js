'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    Question.init({
        question_vi: DataTypes.STRING,
        question_en: DataTypes.STRING,
        answer_vi: DataTypes.TEXT('long'),
        answer_en: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Question',
    });
    return Question;
};