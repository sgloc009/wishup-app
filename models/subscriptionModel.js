const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

subscriptionAttributes = {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
}

class Subscription extends Model {}

Subscription.init(subscriptionAttributes, 
    { 
        sequelize,
        timestamps: true,
        createdAt: 'start_date',
        updatedAt: false
    }
)

module.exports = Subscription;