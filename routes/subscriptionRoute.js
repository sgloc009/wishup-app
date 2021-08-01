const { Subscription, Plan } = require("../models");
const { Op } = require("sequelize");

const router = require("express").Router();

router.get("/test", (req, res)=>{
    console.log("subscription working");
    res.status(200).send("Done");
})

router.post("/", async (req,res)=>{
    let { user_name, plan_id, start_date } = req.body;
    let result = undefined;
    let Validity = undefined;
    let Cost = 0;
    try{
        if(!((typeof user_name === "undefined") && (typeof plan_id === "undefined") && (typeof start_date === "undefined"))){
            try{
                ({ Cost, Validity } = await Plan.findOne({where:{ id: plan_id }}));
            }
            catch(err){
                throw "No such Plan exists."
            }
            let valid_date = new Date(new Date(start_date).getTime()+(Validity*24*60*60*1000));
            await Subscription.create({
                user_name: user_name,
                plan_id: plan_id,
                start_date: start_date,
                valid_till: valid_date
            })    
            result = {
                status: "SUCCESS",
                amount: Cost
            }
        }
    }
    catch(e){
        res.status(400);
        result = {
            status: "FAILED",
            amount: -Cost
        }
    }
    finally{
        res.status(200).send(result);
    }
})

router.get("/:username", async(req, res)=>{
    let { username } = req.params;
    let result = undefined;
    res.status(200);
    res.setHeader("Content-Type","application/json");
    try{
        if(typeof username !== undefined){
            result = await Subscription.findAll({
                where: {
                    user_name: username
                },
                attributes: ["plan_id", "start_date", "valid_till"]
            })
            if(result.length==0){
                throw "No records found."
            }
        }
    }
    catch(err){
        res.status(404);
        res.setHeader("Content-Type", "plain/text");
        result = err;
    }
    finally{
        res.send(result);
    }
})

router.get("/:username/:date", async (req, res)=>{
    let { username, date } = req.params;
    let result = undefined;
    res.status(200);
    try{
        if((typeof username !== undefined) && (typeof date !== undefined)){
            try{
                result = await Subscription.findOne({where: {
                    user_name: username,
                    start_date: {
                        [Op.like]: new Date(date)
                    }
                },
                attributes: ["plan_id", "valid_till"]
                })
                result = {...result.dataValues};
                result["days_left"] = (new Date(result["valid_till"]).getTime() - new Date().getTime())/(24*60*60*1000);
                delete result["valid_till"];
            }
            catch(err){
                res.status(404)
                throw "No records founds";
            }
        }
        else{
            res.status(400)
            throw "Parameters required are username and date"
        }
    }
    catch(err){
        res.setHeader("Content-Type", "plain/text")
        result = err
    }
    finally{
        res.send(result);
    }
})

module.exports = router;