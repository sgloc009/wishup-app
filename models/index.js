exports.module = {
    User: require("./userModel"),
    Plan: require("./planModel"),
    Subscription: require("./subscriptionModel")
}

this.module.Plan.belongsToMany(this.module.Subscription, {through: 'Subscription_Plan'});
this.module.Subscription.belongsToMany(this.module.User, {through: 'User_Subscriptions'});