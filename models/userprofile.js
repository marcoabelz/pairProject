'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routers');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {foreignKey: "UserId"})
    }

    dateFormat() {
      return this.dateOfBirth.toISOString().slice(0,10)
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.CHAR,
    balance: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  UserProfile.beforeValidate((data, option) => {
    data.balance = 0
  })
  return UserProfile;
};