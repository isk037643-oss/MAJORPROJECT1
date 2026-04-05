const express = require("express");
const router = express.Router();
const User = require("../models/user.js"); //post request a user k use korar jonno require korlam
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignupForm);

//signup form
router.post("/signup", wrapAsync(userController.signup)); 

 
//reviews login route
router.get("/login",userController.renderLoginForm );


router.post(
    "/login", 
    saveRedirectUrl, 
    passport.authenticate('local', {
        failureRedirect: "/login", 
        failureFlash: true, 
    }), 
    userController.login  //ata login korabe na login to passport korabe login ar pore je kaj hobe ai middleware korabe  
);

router.get("/logout", userController.logout);

module.exports = router;