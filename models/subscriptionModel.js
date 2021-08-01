const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

subscriptionAttributes = {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    start_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW, allowNull: false },
    valid_till: { type: DataTypes.DATEONLY, allowNull: false}
}

class Subscription extends Model {}

Subscription.init(subscriptionAttributes, 
    { sequelize }
)

module.exports = Subscription;