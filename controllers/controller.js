const { Product, Category, User, UserProfile } = require("../models");
const { Op } = require("sequelize");
const { format_currency } = require("../helpers");
const bcryptjs = require("bcryptjs");

class Controller {
  //session checker
  static async sessionChecker(req, res, next) {}

  static async landingPage(req, res) {
    try {
      // let {category} = req.query
      // console.log(req.query);
      // console.log(datas, '++++++');

      let datas = await Category.findAll();

      let datas1 = await Product.findAll({ limit: 8 });
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
      let option = {};
      if (searchProduct) {
        option.where = {
          name: {
            [Op.iLike]: `%${searchProduct}%`,
          },
        };
      }
      let datas = await Product.findAll(option);
      res.render("showAllProducts", {
        title: "Products List",
        datas,
        format_currency,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
      let categories = await Category.findAll();
      res.render("formAddProduct", { title: "Form Add Product", categories });
    } catch (error) {
      res.send(error);
    }
  }

  static async addProductPost(req, res) {
    try {
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
      let {productId} = req.params
      let products = await Product.findByPk(productId, {
        include: Category
      })
      // console.log(products);
      let categories = await Category.findAll()
      res.render('formEditProduct', {title: 'Form Edit Product', products, categories})
    } catch (error) {
      res.send(error);
    }
  }

  static async detailProductUpdate(req, res) {
    try {
      
      let {productId} = req.params
      let {name, description, price, CategoryId } = req.body

      let data = await Product.findByPk(productId, {

      })
      await data.update({name, description, price, CategoryId})
      // console.log(req.body);
      res.redirect(`/products`)
    } catch (error) {
      console.log(error);
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
      let { error } = req.query;
      res.render("loginQ", { title: "Login Form", error });
    } catch (error) {
      res.send(error);
    }
  }

  static async loginUserPost(req, res) {
    try {
      let { email, password } = req.body;
      console.log(req.body);

      let data = await User.findOne({ where: { email } });
      console.log(data);
      if (data) {
        let result = bcryptjs.compareSync(password, data.password);
        if (!result) {
          res.send("Username / Password salah!");
        } else {
          req.session.email = data.email;
          req.session.role = data.role;

          res.redirect("/");
        }
      } else {
        const errors = "tolong banget login dlu";
        res.redirect(`/login?error=${errors}`);
      }
    } catch (error) {
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
      let { email, password } = req.body;
      if (password) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        password = hash;
      }
      await User.create({ email, password });
      User.nodeMailer(email);
      // await UserProfile.create({
      //   name,
      //   dateOfBirth,
      //   address,
      //   phoneNumber,
      //   gender,
      // });
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((err) => err.message);
        res.send(errors);
      } else {
        res.send(error);
      }
    }
  }
  
  static async showProductByCategory(req, res) {
    try {
      let {id} = req.params
      // console.log(id);

      let dataProduct = await Category.findByPk(id,{
        include: Product
      })
      
      let data = dataProduct.Products

      // res.send(dataProduct)
      res.render('productByCategory', {data, format_currency})
    } catch (error) {
      res.send(error)
    }
  }
  static async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      res.send(error);

    }
  }
}

module.exports = Controller;
