const router = require("express").Router();

router.get("/test", (req,res)=>{
    console.log("req handled");
    res.status(200).send("Done");
})

module.exports = router;