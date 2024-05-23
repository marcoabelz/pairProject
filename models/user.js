"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
var nodemailer = require("nodemailer");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { foreignKey: "UserId" });
      User.hasMany(models.Cart, { foreignKey: "UserId" });
    }

    static async nodeMailer(email) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "marcoabel25@gmail.com",
          pass: "livk orbl blac qfeh",
        },
      });
    
      var mailOptions = {
        from: "marcoabel25@gmail.com",
        to: email,
        subject: "Congratulation, Your account has been registered",
        text: "Welcome to Xiopee, happy Xiaoping!",
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email tidak boleh kosongAAAA",
          },
          notNull: {
            msg: "Email tidak boleh kosongAAAA",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          notNull: {
            msg: "Password tidak boleh kosong",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((data, option) => {
    data.role = "customer";
  });
  // User.beforeCreate((data, option) => {
  //   const salt = bcryptjs.genSaltSync(10);
  //   const hash = bcryptjs.hashSync(this.password, salt);
  //   this.password = hash;
  // });
  return User;
};
