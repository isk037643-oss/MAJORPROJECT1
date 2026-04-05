const Listing = require("./models/listing"); 
const Review  = require("./models/review"); 
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
   // console.log(req.path, "..", req.originalUrl);  //ata dekhabe request ar modhe path ki chilo r originalUrl ki chilo
    if(!req.isAuthenticated()) {      //atar mane hoche j jodi user login na ache tahole tahole req.flash kore login page redirect kore dao. ataq notun page a render korar age hobe. mane login korar por originalUrl a redirect hoye jabe 
    req.session.redirectUrl = req.originalUrl; // ata korlam karon jodi login na thake tahole req.session.redirectUrl ar moddhe address ta vore nilam
    req.flash("error", "you must be login to create listing");
    return res.redirect("/login");

  }
  next();   //jodi user login ba Authenticated hoi tahole next k call korbe 
}



module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {  //
        res.locals.redirectUrl = req.session.redirectUrl;  //req.session.redirectUrl k local a save korlam karon jodi login kora na thake tahole login korar por passport sei sesssion ar request theke sob information delete kore dei tai fole login korar por redirect korbe ta hoi na tai local a save kore rakhe niye redirect kore
    }
    next();
};


//jodi listing tar owner hoi tobei se listing ta k edit,delete,update korte parbe
module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;   //je request pathabe tar id
    let listing = await Listing.findById(id); //database theke listing k niye asbe. o require o korte hobe [const Listing = require("./models/listing"); ]
    if (!listing.owner.equals(res.locals.currUser._id)) {  //listing owner id ar sathe current user id ar compare korche jodi same hoi tobei edit, delete, update operations korte parbe 
        req.flash("error", "you don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing = (req,res,next) => {
  let {error} = listingSchema.validate(req.body);
  if(error) {
    // throw new ExpressError(400, result.error);
    throw new ExpressError(400, error.message);

  } else {
    next();
  }
};



//validate review
module.exports.validateReview = (req,res,next) => {
  let {error} = reviewSchema.validate(req.body);
  if(error) {
       throw new ExpressError(400, error.message);
  } else {
    next();
  }
};



//je review ta delete korbe se ki sei review ar author ba owner ki na check korbe.jodi author hoi tobei delete korte pabe 
module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;  //show page a redirect korar jonno listing ar id ta laglo
    let review = await Review.findById(reviewId); // reviewId diye databases theke pura review find korche
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "you are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}