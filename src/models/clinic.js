'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clinic.init({
    name: DataTypes.STRING,
    name_en: DataTypes.STRING,
    address: DataTypes.STRING,
    address_en: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT('long'),
    descriptionMarkdown: DataTypes.TEXT('long'),
    descriptionHTML_En: DataTypes.TEXT('long'),
    descriptionMarkdown_En: DataTypes.TEXT('long'),
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};