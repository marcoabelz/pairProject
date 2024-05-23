const { Product, Category, User, UserProfile } = require("../models");
const { Op } = require("sequelize");
const { format_currency } = require("../helpers");

class Controller {
  static async landingPage(req, res) {
    try {
      // let {category} = req.query
      // console.log(req.query);
      let datas = await Category.findAll()
      let datas1 = await Product.findAll()
      // console.log(datas, '++++++');
      res.render("landingPage", { title: "Landing Page" , datas, datas1 , format_currency});
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
      res.render("showAllProducts", {
        title: "Products List",
        datas,
        format_currency,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
      let categories = await Category.findAll();
      console.log(categories);
      res.render("formAddProduct", { title: "Form Add Product", categories });
    } catch (error) {
      res.send(error);
    }
  }

  static async addProductPost(req, res) {
    try {
      console.log(req.body);
      let { name, description, price, CategoryId } = req.body;
      await Product.create({ name, description, price, CategoryId });
      res.redirect("/products");
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
      let { searchUser } = req.query;
      let option = {
        include: {
          model: User,
        },
      };
      if (searchUser) {
        option.where = {
          name: {
            [Op.iLike]: `%${searchUser}%`,
          },
        };
      }
      let datas = await UserProfile.findAll(option);
      // res.send(datas);
      res.render("showAllUsers", { title: "Users List", datas });
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteProductById(req, res) {
    try {
      let { productId } = req.params;
      await Product.destroy({ where: { id: productId } });
      res.redirect("/products");
    } catch (error) {
      res.send(error);
    }
  }

  static async getLogin(req, res) {
    try {
      res.render('login')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Controller;
