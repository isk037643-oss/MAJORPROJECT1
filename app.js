const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js"); //review ar schema require korlam

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");  //akane listing ar request jache server a ba route create korche 
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
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
 

const sessionOptions = {  //ata session ar middleware 
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  //akhane kookie ar expiry date 
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,    
  },
};


app.get("/", (req, res) => {
  res.send("Hi i am root");
});


app.use(session(sessionOptions)); // passport korar age sesssion implemention hote hobe. karon akta session ar modhe user bivinno page a jai 
app.use(flash());  //flash use hobe route suru hobar thik age r session ar thik pore 
 
app.use(passport.initialize()); //passport ke use korar age initialize korte hobe
app.use(passport.session()); // jokho akta session ar modhe bivinno page a jai tokhon ai session ar madhome website jante pare j akta session ar modhe ache 
passport.use(new LocalStrategy(User.authenticate())); //passprot ar modhe je new LocalStrategy create hoyeche tar throw diye User Authenticate() hoche. r authenticate mane sign-in,sign-up,login

passport.serializeUser(User.serializeUser()); // User related joto infomation ache sob ke session ar modhe store kora k bole user ke  serialize kora. jemon akbar user sign-up/login kore tokhon usr related sob information session a store hoi jate onno onno page a gele bar bar login na korte hoi
passport.deserializeUser(User.deserializeUser());  // user related sob information k jodi na store korai session a remove korai take deserialize bole. jemo akbar session ses hoye gele deserialize korte hobe


//ai middleware ta kora hoyeche karon jokhon req object ke ejs file accecpt kore na tokhon local a convert korar jonno 
app.use((req, res, next) => {   // Ai middleware ta route suru hobar thik age hobe jate route ta k route ta k call kore dei
  res.locals.success = req.flash("success");  // flash ar modhe je success ta ache seta hoche key tar modhe message ta vora ache r je success ta local ar kache ache seta variable. Ai variable ta use hobe  
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // req.user ar kache current user ar sob details ache login ache ki na 
  // console.log(res.locals.success);
  next();
}); 


//  

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






app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);  //"/listings/:id/reviews" ata hoche parrent route ar vitore parameter hoche id r jokhon ai parameter id ta review a pathabo tokhon <mergeParams: true> use korbo review a jokhon object route create korbe okhane
app.use("/", userRouter);











// router.put("/listings/:id", async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });





// app.put("/listings/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// }));

// DELETE ROUTE
// app.delete("/listings/:id", wrapAsync(async (req,res) =>{
//   let {id} = req.params;
//  let deletedListing = await Listing.findByIdAndDelete(id);
//  console.log(deletedListing);
//  res.redirect("/listings");
// }));



//  jokhon onno kono ojana  path debo tokhon ai duto use hobe. ai duto error handle korbe
// app.all("*",(req,res,next) => {
// next(new ExpressError(404,"page is not foun!"));
// });


// app.use((err,req,res,next) =>{
//   let {statusCode =500, message = "Something went wrong"} = err;
//   res.status(statusCode).send(message);
// });

app.use((err,req,res,next) =>{
  // res.send("something went wrong");
  let {message} = err;
  res.render("error.ejs",{message,err});
});

app.listen(8080, () => {
  console.log("working on main page");
});
