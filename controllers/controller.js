const { Product, Category, User, UserProfile } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async landingPage(req, res) {
    try {
      res.send("LandingPage");
    } catch (error) {
      res.send(error);
    }
  }

  static async showAllProduct(req, res) {
    try {
      let { searchProduct } = req.query;
      console.log(searchProduct);
      let option = {};
      if (searchProduct) {
        option.where = {
          name: {
            [Op.iLike]: `%${searchProduct}%`,
          },
        };
      }
      console.log(option);
      let datas = await Product.findAll(option);
      res.render("showAllProducts", { title: "Products List", datas });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async addProductPost(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async showDetailProductById(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async showEditProduct(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async detailProductUpdate(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async showAllUser(req, res) {
    try {
      let datas = await UserProfile.findAll({
        include: {
          model: User,
        },
      });
      // res.send(datas);
      res.render("showAllUsers", { title: "Users List", datas });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
