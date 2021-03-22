// Express Framework
const express = require('express')
const app = express()
// MongoDB
const mongoose = require('mongoose')
//Body-parser
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        console.log("Connection to MongoDB successfully established")
    })
    .catch(() => {
        throw new Error("Could not establish connection to MongoDB");
    });

// using bodyParser urlencoded extension for parsing frontend requests
app.use(bodyParser.urlencoded({extended: true}))


// Using routes from file routes.js
app.use(require('./routes'))

module.exports = app