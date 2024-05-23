"use strict";
const { Model } = require("sequelize");
const { options } = require("../routers");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { foreignKey: "UserId" });
    }

    dateFormat() {
      return this.dateOfBirth.toISOString().slice(0, 10);
    }
  }
  UserProfile.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nama tidak boleh kosong",
          },
          notNull: {
            msg: "Nama tidak boleh kosong",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tanggal lahir tidak boleh kosong",
          },
          notEmpty: {
            msg: "Tanggal lahir tidak boleh kosong",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address tidak boleh kosong",
          },
          notNull: {
            msg: "Address tidak boleh kosong",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nomor telfon tidak boleh kosong",
          },
          notNull: {
            msg: "Nomor telfon tidak boleh kosong",
          },
        },
      },
      gender: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Gender tidak boleh kosong",
          },
          notNull: {
            msg: "Gender tidak boleh kosong",
          },
        },
      },
      balance: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );
  // UserProfile.beforeValidate((data, option) => {
  //   data.balance = 0
  // })
  return UserProfile;
};
