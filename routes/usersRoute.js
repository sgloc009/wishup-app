const router = require("express").Router();
const model = require("../models");

router.get("/test", (req,res)=>{
    console.log("req handled");
    res.status(200).send("Done");
})

module.exports = router;