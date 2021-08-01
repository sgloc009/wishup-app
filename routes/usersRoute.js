const router = require("express").Router();
const { User, Subscription } = require("../models");

router.get("/test", (req,res)=>{
    console.log("req handled");
    res.status(200).send("Done");
})

router.put("/:name", async (req, res)=>{
    let name = req.params.name;
    let result = {}
    try{
        result = await User.create({user_name: name});
        delete result["updatedAt"]
    }
    catch(e){
        result = { msg: `Username: '${name}' already exists.` }
    }
    res.send(result);
})

module.exports = router;