const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session"); //ata session ke require korlam. express-session k install kore
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");  //views file ar jonno
app.set("views", path.join(__dirname,"views"));


//const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode")); //jokhon e request asbe tokhon cookieParser middleware ar throw jabe niye match kore cookie k parse korbe

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", { signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.getsignedcookies);
//     res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("madeIn", "India");
//     res.cookie("greet", "hello"); // server ar sahajje cookie pathachi
//     res.send("send you some cookies!");
// });

// app.get("/greet", (req, res) => {
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, I am ${name}`);
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root!");
// });

// // app.get("/", (req, res) => {
// // res.send("Hi, I am root!");
// // });

// app.use("/users", users);
// app.use("/posts", posts);

// <2> EXPRESS-SESSION

// app.use(    //akhane middleware ar madhome session create korlam r session ar modhe secret korlam current session create korar jonno abar joto rokom request asbe akta kore id browser server a giye store hobe
//   session({
//     secret: "mysupersecretstring",
//     resave: false,
//     saveUninitialized: true,
//   }),
// ); 

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`you sent a request ${req.session.count} times`);
// });



                          //<3> STORING AND USING DATA 
// const sessionOptions ={
//     secret: "mysupersecretstring",
//     resave: false,
//     saveUninitialized: true,
// };

// app.use(session(sessionOptions));

  
// app.get("/register", (req, res) => {
//   let { name = "anonymous" } = req.query; //url a je query pathabo seta name ar modhe dhukbe 
//   req.session.name = name;   // akhane req.session hoche akta objeche tar modhe akta variable create korlam ai vabe "req.session.name". mane request a je query pathabo seta req.session.name ar modhe dhukbe 
//   res.redirect("/hello"); 
// });

// app.get("/hello", (req, res) => {
//   res.send(`hello, ${req.session.name}`);  //req.session.name ar modhe ja thakbe akhane use hobe ba print hobe.Ai vabe Expression-Session ar madhome  data ke server a store kore tarpor browser a use korchi
// });



//<4> CONNECT-FLASH
// const sessionOptions ={
//     secret: "mysupersecretstring",
//     resave: false,
//     saveUninitialized: true,
// };

// app.use(session(sessionOptions));
// app.use(flash()); //pop up ar jonno use hoi

  
// app.get("/register", (req, res) => {
//   let { name = "anonymous" } = req.query; //url a je query pathabo seta name ar modhe dhukbe 
//   req.session.name = name;   // akhane req.session hoche akta objeche tar modhe akta variable create korlam ai vabe "req.session.name". mane request a je query pathabo seta req.session.name ar modhe dhukbe 
//   req.flash("success", "user register successfully");  //page redirect hobar age akta message send hobe take flah message bole. flash ar modhe dui dhoroner parameter thake prothom ta key 2nd ta message
//   res.redirect("/hello"); 
// });

// app.get("/hello", (req, res) => {
// res.render("page.ejs", { name: req.session.name, msg: req.flash("success")});
// });


//<5> RES.LOCALS A FLASS MESSAGE K BETTER VABE USE KORA HOI

const sessionOptions ={
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash()); //pop up ar jonno use hoi


app.use((req, res, next) => {      // ata middleware je jinis bar bar use hobe seta middlewar rakhbo
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

  
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query; //url a je query pathabo seta name ar modhe dhukbe 
  req.session.name = name;   // akhane req.session hoche akta objeche tar modhe akta variable create korlam ai vabe "req.session.name". mane request a je query pathabo seta req.session.name ar modhe dhukbe 

  if(name ==="anonymous") {
    req.flash("error", "user not registered");
  }
  else {
     req.flash("success", "user register successfully");  //page redirect hobar age akta message send hobe take flah message bole. flash ar modhe dui dhoroner parameter thake prothom ta key 2nd ta message
  }

  res.redirect("/hello"); 
});

app.get("/hello", (req, res) => {

  console.log(res.locals.successMsg);
  console.log(res.locals.errorMsg);
res.render("page.ejs", { name: req.session.name });
});




app.listen(3000, () => {
  console.log("Server is listening to 3000");
});
