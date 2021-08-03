
const User =  require("./userModel");
const Plan = require("./planModel");
const Subscription = require("./subscriptionModel");
const sequelize = require("./dbConnection");
const EventEmitter = require("events");

let dbIsActiveTopic = new EventEmitter();

sequelize.afterBulkSync("Toggle DB Active", ()=>{
    dbIsActiveTopic.emit("dbactive");
})


User.hasMany(Subscription, { 
    foreignKey: {
        allowNull: false,
        name: "user_name"
    }
});
Plan.hasMany(Subscription, { 
    foreignKey: {
        allowNull: false,
        defaultValue: "FREE",
        name: "plan_id"
    }
});

module.exports = {
    User,
    Plan,
    Subscription,
    dbIsActiveTopic
    
}
