const Listing = require("../models/listing");


//akhane routes index ar callback likha holo 
module.exports.index = async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
  
}; 


//new route ar callback
module.exports.renderNewForm = (req,res) => {
  console.log(req.user);  // jokhon user login hoi tokhon user related information req ar moddhe store hoi
  
    res.render("listings/new.ejs",);
}

//show route
module.exports.showListing = async (req,res) =>{
  const {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  })
  .populate("owner");  // akhane database theke listing asche tokhon   poulate ki kore  reviews ar sudhu object na  puro data ke niye jache show.ejs a. o  chaining kore database theke woner ke o niye jache show.ejs a 
  
  if(!listing){ // atar mane jodi listing exist na kore
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs",{listing}); 
};


//create route
module.exports.createListing = async (req,res,next) =>{
  // if(!req.body.listing) {
  //   throw new ExpressError(400, "Send valid data fo listig");
  // } 
  
    const newListing = new Listing(req.body.listing); 
    newListing.owner = req.user._id;  //je new listing create kore request pathachi tar username k add  korchi newListing.owner ar modhe
    await newListing.save();
    req.flash("success", "New listing creaded!");  //"New listing creaded!" Ai message ta flash kore jekhane ai route ta res.redirect hoche se page a giye response ar local variable (res.locals.success) ar modhe message ache sei variable ta skhane use korbo sobar opore
    res.redirect("/listings");
    // next();
  };

  //Edit route
  module.exports.editListing =async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "listing  you requested for does not exist");
      return res.redirect("/listings");
    }
      
    res.render("listings/edit.ejs",{listing});
  };


  //Update route
  module.exports.updateListing = async (req,res) =>{
    // if(!req.body.listing) {
    //   throw new ExpressError(400, "Send valid data fo listig");
    // } 
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
  };


  //delete route
  module.exports.destroyListing = async (req,res) =>{
    let {id} = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
  //  console.log(deletedListing);
   req.flash("success", "Listing deleted!");
   res.redirect("/listings");
  };