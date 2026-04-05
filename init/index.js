const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

// AT FIRST DELETE_INITIAL_DATA
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: '69b74f860f4a3085ff42b630' }));  //initData ar data array te map function ar modhome obj a notun property k add kore diche 
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
//
