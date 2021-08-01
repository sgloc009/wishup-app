const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbConnection");


class User extends Model {}
const userTable = {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    user_name: { type: DataTypes.STRING(100), allowNull: false },
}

User.init(userTable,{sequelize, timestamps: true})

module.exports = User;