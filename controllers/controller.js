const { Product, Category, User, UserProfile } = require("../models");
const { Op } = require("sequelize");
const { format_currency } = require("../helpers");
const bcryptjs = require("bcryptjs");

class Controller {
  static async landingPage(req, res) {
    try {
      // let {category} = req.query
      // console.log(req.query);
      let datas = await Category.findAll();
      let datas1 = await Product.findAll({ limit: 8 });
      // console.log(datas, '++++++');
      res.render("landingPageQ", {
        title: "Landing Page",
        datas,
        datas1,
        format_currency,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async showAllProduct(req, res) {
    try {
      let { searchProduct } = req.query;
      // console.log(searchProduct);
      let option = {};
      if (searchProduct) {
        option.where = {
          name: {
            [Op.iLike]: `%${searchProduct}%`,
          },
        };
      }
      // console.log(option);
      let datas = await Product.findAll(option);
      res.render("showAllProducts", {
        title: "Products List",
        datas,
        format_currency,
      });
    } catch (error) {
      // console.log(error);
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
      let categories = await Category.findAll();
      // console.log(categories);
      res.render("formAddProduct", { title: "Form Add Product", categories });
    } catch (error) {
      res.send(error);
    }
  }

  static async addProductPost(req, res) {
    try {
      // console.log(req.body);
      let { name, description, price, CategoryId } = req.body;
      await Product.create({ name, description, price, CategoryId });
      res.redirect("/products");
    } catch (error) {
      res.send(error);
    }
  }

  static async showDetailProductById(req, res) {
    try {
      let { productId } = req.params;
      let data = await Product.findByPk(productId);
      // res.send(data);
      res.render("detailProduct", {
        title: "Detail Product",
        data,
        format_currency,
      });
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
      // res.send(datas[0].User);
      // console.log(datas);
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

  static async showLoginForm(req, res) {
    try {
      res.render("loginQ", { title: "Login Form" });
    } catch (error) {
      res.send(error);
    }
  }

  static async loginUserPost(req, res) {
    try {
      let { email, password } = req.body;
      let data = await User.findOne({ where: { email } });
      if (data) {
        let result = bcryptjs.compareSync(password, data.password);
        if (!result) {
          res.send("Username / Password salah!");
        } else {
          res.send(`${data.role} - berhasil login`);
        }
      } else {
        res.send(
          "Username tidak ditemukan, silahkan mendaftar terlebih dahulu"
        );
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showSignupForm(req, res) {
    try {
      res.render("formSignup", { title: "Form Sign Up" });
    } catch (error) {
      res.send(error);
    }
  }

  static async signupUserPost(req, res) {
    try {
      // let { email, password, name, dateOfBirth, address, phoneNumber, gender } =
      //   req.body;
      let { email, password } = req.body;
      if (password) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        password = hash;
      }
      await User.create({ email, password });
      // await UserProfile.create({
      //   name,
      //   dateOfBirth,
      //   address,
      //   phoneNumber,
      //   gender,
      // });
      res.redirect("/");
      // res.redirect;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((err) => err.message);
        res.send(errors);
      }
      res.send(error);
    }
  }
}

module.exports = Controller;
