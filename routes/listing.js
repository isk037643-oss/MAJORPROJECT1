const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js"); //akhane middleware.js k require korlam login ki na seta check korar jonno

const ListingController = require("../controllers/listings.js")
 
//Index - route
router.get("/", wrapAsync(ListingController.index));


// NEW ROUTE
router.get(
  "/new", 
  isLoggedIn, 
  ListingController.renderNewForm );  // ListingController.renderNewForm  ata callback ja controllers folder a ache 


// SHOW ROUTE
router.get(
  "/:id", 
  wrapAsync(ListingController.showListing)
);


// CREATE_ROUTE
router.post("/", 
  isLoggedIn,
  isOwner, 
  validateListing,  //ata check kore je listing ta create,update,delete korte chai seta valid ki na
  wrapAsync(ListingController.createListing)
  
 
);


// EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.editListing ));

// UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn, //ata check korbe login na authenticate ache ki na
  isOwner,
  validateListing,
  wrapAsync(ListingController.updateListing));

// DELETE ROUTE
router.delete("/:id",
  isLoggedIn, 
  isOwner,
  wrapAsync(ListingController.destroyListing));



module.exports = router;