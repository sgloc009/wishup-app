const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbConnection");


class User extends Model {}
const userTable = {
    user_name: { type: DataTypes.STRING(100), allowNull: false, primaryKey: true }
}

User.init(userTable,{ sequelize, timestamps: true, createdAt: "created_at" })

module.exports = User;