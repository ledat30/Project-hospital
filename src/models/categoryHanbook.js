'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryHandbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // CategoryHandbook.hasMany(models.Handbook, { foreignKey: 'categoryId' })
    }
  };
  CategoryHandbook.init({
    nameVI: DataTypes.STRING,
    nameEN: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CategoryHandbook',
  });
  return CategoryHandbook;
};