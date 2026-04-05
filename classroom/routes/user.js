const express = require("express");
const router = express.Router(); //ata akta router objedct create kore

//Index - users
router.get("/", (req, res) => {
    res.send("GET for users");
});

//Show - users
router.get("/:id", (req, res) => {
    res.send("GET for user id");
});

//Post - user
router.post("/", (req, res) => {
    res.send("Post for users");
});

//Delete - user
router.delete("/:id", (req, res) => {
    res.send("DELETE for user id");
});

module.exports = router;