const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

planAttributes = {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    Validity: { type: DataTypes.SMALLINT, allowNull: false },
    Cost: { type: DataTypes.INTEGER, allowNull: false }
}

class Plan extends Model {}

Plan.init(planAttributes, { sequelize });

module.exports = Plan;