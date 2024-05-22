const { Product, Category } = require("../models");

class Controller {
  static async landingPage(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async showAllProduct(req, res) {
    try {
      let datas = await Product.findAll();
    //   res.send(datas);
        res.render("showAllProducts", { datas });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
