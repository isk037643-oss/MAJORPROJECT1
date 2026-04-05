const express = require("express");
const router = express.Router({ mergeParams: true }); // jokhon parrent route ar vitore parameter vora thakbe abong use hobe tokhon <mergeParams: true> hobe
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js"); //review ar schema require korlam
const Listing = require("../models/listing.js");  //ata require holo karon review Listing ar modhe hobe
const {validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");



//REVIWES POST ROUTE
router.post(
  "/",
  isLoggedIn,  //hopscotch theke jodi review create kore tahole ata check korbe logged in ache ki na 
  validateReview, 
  wrapAsync(reviewController.creatReview));

// DELET REVIEW ROUTE
router.delete(
  "/:reviewId", 
  isLoggedIn,
  isReviewAuthor, //jodi review ta author ba owner hoi tobei delete korte parbe ai line ta mane
  wrapAsync(reviewController.destroyReview)); 


module.exports = router;