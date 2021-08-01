
let User =  require("./userModel");
let Plan = require("./planModel");
let Subscription = require("./subscriptionModel")

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
    Subscription
}
