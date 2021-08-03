const router = require("express").Router();
const { User, dbIsActiveTopic } = require("../models");

let dbIsActive = false

dbIsActiveTopic.on("dbactive",()=>{
    dbIsActive = true;
})

router.get("/test", (req,res)=>{
    res.header({"Content-Type": "plain/text"});
    if(dbIsActive){
        console.log("req handled");
        res.status(200).send("Done");
    }
    else{
        res.status(500).send("Internal Server Error.");
    }
})

router.put("/:name", async (req, res)=>{
    if(dbIsActive){
        let name = req.params.name;
        let result = {}
        try{
            result = await User.create({user_name: name});
            delete result["updatedAt"]
        }
        catch(e){
            res.setHeader("Content-Type","plain/text");
            res.status(400);
            result = { msg: `Username: '${name}' already exists.` }
        }
        res.send(result);
    }
    else{
        res.header({"Content-Type": "plain/text"});
        res.status(500).send("Internal Server Error.");
    }
})

module.exports = router;