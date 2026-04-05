// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,

//   image: {
//     // filename: String ,
//     url: {
//       type: String,
//       default:
//         // "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//     },
//   },

//   price: Number,
//   location: String,
//   country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); //akhane review k require korlam

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

image: {
  url: {
    type: String,
    // default: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
},

  price: Number,
  location: String,
  country: String,
  reviews: [
  {
    type: Schema.Types.ObjectId,  // akhane review ar object id store hobe 
    ref: "Review",  //akhane review ke reference korlam
  }
  ],
  owner: {
    type: Schema.Types.ObjectId,  // akhane user ar object id store hobe 
    ref: "User",
  },
});


listingSchema.post("findOneAndDelete", async (listing) => {   //jokhon listing ke delete kori tokhon tar modhe onek review thake sei review gulo jate database theke delete hoye jai tar jonno ata .
  if(listing) {   //if mane akhane jodi kono listing aseche tobei hobe
    await Review.deleteMany({_id : {$in: listing.reviews}});     // uender_scuore_id(_id) ta jodi atar modhe  <$in: listing.reviews> thake tahole tahole database theke o sob review delete hoye jabe.
  }
});


module.exports = mongoose.model("Listing", listingSchema);