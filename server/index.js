// mongodb+srv://portfolio:<db_password>@cluster0.h64p2gp.mongodb.net/?appName=Cluster0

const express = require ('express')
const connectDB = require('./db.js')
const UserPortfolio = require("./models/UserPortfolio");

const app = express()

connectDB();

app.listen(3000, () => {console.log("server is running ");})