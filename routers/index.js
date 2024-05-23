const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

// define the home page route

//SignUp User
router.get("/signup", Controller.showSignupForm);
router.post("/signup", Controller.signupUserPost);
//END OF SignUpUser

//Login user
router.get("/login", Controller.showLoginForm);
router.post("/login", Controller.loginUserPost);

//Logout
router.get("/logout", Controller.logout);

//SESSION
router.use(function (req, res, next) {
  console.log(req.session);

  if (!req.session.email) {
    const error = "You did not login yet! :D";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.get("/", Controller.landingPage);

//READ PRODUCT
router.get("/products", Controller.showAllProduct);
//END OF READ PRODUCT

//ADD PRODUCT
router.get("/product/add", Controller.showAddProductForm);
router.post("/product/add", Controller.addProductPost);
//END OF ADD PRODUCT

//Menampilkan detail product
router.get("/product/:productId", Controller.showDetailProductById);

//EDIT
router.get("/product/:productId/edit", Controller.showEditProduct);
router.post("/product/:productId/edit", Controller.detailProductUpdate);
//END OF EDIT

//READ USER
router.get("/users", Controller.showAllUser);
//END OF READ USER

//Logout user

//User Profile
// router.post("/userProfile/:userId", Controller.userProfilePost);

//DELETE
router.get("/users/:id/delete");
router.get("/products/:productId/delete", Controller.deleteProductById);
//END OF DELETE

module.exports = router;
