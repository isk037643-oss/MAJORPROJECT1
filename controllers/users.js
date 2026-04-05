const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};


// signup review route
module.exports.signup =async(req, res) => {    //akhane try catch use korlam karon jodi signup korar somoy error ase allready exist thkale  tahole error ta catch kore tar modhe akta flash message pathabo 

    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password); // ata register user dibe 
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
             req.flash("success", "Wellcome to Wanderlust");
             res.redirect("/listings");
        });
       
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    } 
};


//login reviews route
module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
};


//login ar pore j kaj hobe ai middle ware a
module.exports.login = async(req, res) => {
    req.flash("success", "Wellocome back to Wanderlust! ");
    let redirectUrl = res.locals.redirectUrl || "/listings";  //jodi all listings page a theke login kori tahole saveRedirectUrl ta trigger hoi na tai tokhon res.locals.redirectUrl empty thake tokhon redirect kore "/listings" a
    res.redirect(redirectUrl); //login korar ai page a redirect korbe
}

//logout route
module.exports.logout = (req, res, next) => {  //("/logout") ke call koralam logout korte giye 
    req.logout((err) => {  // logout korte giye jodi kono error ase tahole err ar modhe thakbe handle kore next ke call korabe 
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};