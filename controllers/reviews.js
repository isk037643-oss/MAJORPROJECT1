const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.creatReview = async(req,res) =>{   //akhane validateReview ke as a middleware pass kore dilam
//   console.log(req.params.id);  //ata diye chek korlam je kon id asche 
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);  // notun je review ta dilam seta ata 
  newReview.author = req.user._id;  //user login theke jodi kono new review create hoi tahole tar author ba owner k listing ar push korbo tarpor database a save korbo
  // console.log(newReview); // save korar age dekhe nei j newreview  ar author ba owner k 
  listing.reviews.push(newReview);  // noutn review ta listing a push korlam

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review creaded!");
  
  res.redirect(`/listings/${listing._id}`);
  
};


//delete review route
module.exports.destroyReview = async(req,res) => {  // akhane slashh(/) bojhai commo url k. slash ata k denotes korche akhane  /listings/:id/reviews
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  
  res.redirect(`/listings/${id}`);
};