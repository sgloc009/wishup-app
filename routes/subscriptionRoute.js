const { Subscription, Plan } = require("../models");

const router = require("express").Router();

router.get("/test", (req, res)=>{
    console.log("subscription working");
    res.status(200).send("Done");
})

router.post("/", async (req,res)=>{
    let { user_name, plan_id, start_date } = req.body;
    let result = undefined;
    let Cost = 0;
    try{
        if(!((typeof user_name === "undefined") && (typeof plan_id === "undefined") && (typeof start_date === "undefined"))){
            try{
                ({ Cost } = await Plan.findOne({where:{ id: plan_id }}));
            }
            catch(err){
                throw "No such Plan exists."
            }
            await Subscription.create({
                user_name: user_name,
                PlanId: plan_id,
                start_date: start_date
            })    
            result = {
                status: "SUCCESS",
                amount: +Cost
            }
        }
    }
    catch(e){
        result = {
            status: "FAILED",
            amount: -Cost
        }
    }
    finally{
        res.status(200).send(result);
    }
})

module.exports = router;