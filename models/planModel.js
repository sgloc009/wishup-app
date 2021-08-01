const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");


let Plans = [
    {
        id: "FREE",
        Validity: 0,
        Cost: 0
    },
    {
        id: "TRIAL",
        Validity: 7,
        Cost: 0
    },
    {
        id: "LITE_1M",
        Validity: 30,
        Cost: 100
    },
    {
        id: "PRO_1M",
        Validity: 30,
        Cost: 200
    },
    {
        id: "LITE_6M",
        Validity: 180,
        Cost: 500
    },
    {
        id: "PRO_6M",
        Validity: 180,
        Cost: 900
    }
]

let planAttributes = {
    id: { type: DataTypes.CHAR(8), primaryKey: true },
    Validity: { type: DataTypes.SMALLINT, allowNull: false },
    Cost: { type: DataTypes.DOUBLE(this.length=9,decimals=1), allowNull: false }
}

class Plan extends Model {}

Plan.init(planAttributes, { sequelize });

sequelize.afterBulkSync("Add Defaults",()=>{
    Plan.bulkCreate(Plans, { ignoreDuplicates: true })
})


module.exports = Plan;