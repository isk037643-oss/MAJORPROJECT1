const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log(err);
  });
async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine", "ejs");  //views file ar jonno
app.set("views", path.join(__dirname,"views")); 
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride("_method"));   //html a jokhon sudhu GET R POST hoi
app.engine("ejs", ejsMate);    //boilerplate ar jonno  
app.use(express.static(path.join(__dirname, "/public")));   //css file ar jonno


app.get("/", (req, res) => {
  res.send("Hi i am root");
});

// app.get("/testListing", async (req,res) =>{
//     let sampleListing = new Listing({
//         title: "My new vitta",
//         description: " By the beach",
//         price: 1200,
//         location: " Calangute,Goa",
//         country: "India"
//     });
//     await sampleListing.save(); 
//     console.log("sample was saved");
//     res.send("successful testing");
// });


app.get("/listings", async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
  
});


// NEW ROUTE
app.get("/listing/new", (req,res) => {
    res.render("listings/new.ejs",);
});


// SHOW ROUTE
app.get("/listings/:id", async (req,res) =>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing}); 
});

// CREATE_ROUTE
app.post("/listing", async (req,res) =>{
 const newListing = new Listing(req.body.listing); 
 await newListing.save();
 res.redirect("/listings");
});


// EDIT ROUTE
app.get("/listing/:id/edit", async (req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
});

// UPDATE ROUTE
// app.put("/listings/:id", async (req,res) =>{
//   let {id} = req.params;
//   await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   res.redirect(`/listings/${id}`);
// });




// router.put("/listings/:id", async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });





app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// DELETE ROUTE
app.delete("/listings/:id", async (req,res) =>{
  let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("working on main page");
});
