const { Sequelize } = require("sequelize");
const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DATABASE } = require("dotenv").config().parsed;

const sequelize = new Sequelize(DB_HOSTNAME,{username: DB_USERNAME, password: DB_PASSWORD, database: DATABASE});

async function connect(){
    try{
        await sequelize.authenticate()
        await sequelize.sync()
    }
    catch(err){
        console.error("DB cannot connect. Please check config.",)
    }
}

connect()


module.exports = sequelize