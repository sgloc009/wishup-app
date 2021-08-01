const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('mysql://root@localhost:3306',{username: "root", password: "rickishi", database: "wishup"});

module.exports = sequelize
sequelize.sync()