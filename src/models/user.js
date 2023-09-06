'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', primaryKey: 'id', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', primaryKey: 'id', as: 'genderData' })

      User.hasOne(models.Doctor_infor, { foreignKey: 'doctorId' })
      User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' })

      User.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    image: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    positionId: DataTypes.INTEGER,
    reset_token: DataTypes.STRING,
    expires_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};