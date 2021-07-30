const http = require("http");
const express = require("express");
const winston = require("winston");
const {PORT, HOSTNAME} = require("dotenv").config().parsed;
const expressWinston = require("express-winston");
require("winston-daily-rotate-file");

const userRoute = require("./routes/usersRoute");
const subscriptionRoute = require("./routes/subscriptionRoute");

const app = express();
const transport = new winston.transports.DailyRotateFile({
    filename: './logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d'
})

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(expressWinston.logger({
    transports: [
        transport
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}"
}))


app.use("/user", userRoute);
app.use("/subscription", subscriptionRoute);

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})