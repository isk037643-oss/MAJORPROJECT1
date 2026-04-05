const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;  //passport-local-mongoose package ES Module style export ব্যবহার করে।

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); //sudhu matro schema te email a define korlam karon akhane username r password by default dibe

module.exports = mongoose.model("User", userSchema);