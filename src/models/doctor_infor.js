'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_infor.belongsTo(models.User, { foreignKey: 'doctorId' })
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'priceId', primaryKey: 'id', as: 'priceTypeData' })
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', primaryKey: 'id', as: 'provinceTypeData' })
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', primaryKey: 'id', as: 'paymentTypeData' })

        }
    };

    Doctor_infor.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.INTEGER,
        provinceId: DataTypes.INTEGER,
        paymentId: DataTypes.INTEGER,
        count: DataTypes.INTEGER,
        addressClinic: DataTypes.STRING,
        addressClinic_en: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        nameClinic_en: DataTypes.STRING,
        note: DataTypes.STRING,
        note_en: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        contentHTML_en: DataTypes.TEXT('long'),
        contentMarkdown_en: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        description_en: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Doctor_infor',
        freezeTableName: true
    });
    return Doctor_infor;
};