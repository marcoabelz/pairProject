const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

// define the home page route
router.get("/", Controller.landingPage);

//READ PRODUCT
router.get("/products", Controller.showAllProduct);
//END OF READ PRODUCT

//ADD PRODUCT
router.get("/product/add", Controller.showAddProductForm);
router.post("/product/add", Controller.addProductPost);
//END OF ADD PRODUCT

//menampilkan product berdasarkan categorynya
router.get("/product/category/:id", Controller.showProductByCategory)

//Menampilkan detail product
router.get("/product/:productId", Controller.showDetailProductById);

//EDIT
router.get("/product/:productId/edit", Controller.showEditProduct);
router.post("/product/:productId/edit", Controller.detailProductUpdate);
//END OF EDIT

//READ USER
router.get("/users", Controller.showAllUser);
//END OF READ USER

//Login user
router.get("/login", Controller.showLoginForm);
router.post("/login", Controller.loginUserPost);
//Logout user

//SignUp User
router.get("/signup", Controller.showSignupForm);
router.post("/signup", Controller.signupUserPost);
//END OF SignUpUser

//DELETE
router.get("/users/:id/delete");
router.get("/products/:productId/delete", Controller.deleteProductById);
//END OF DELETE

module.exports = router;
