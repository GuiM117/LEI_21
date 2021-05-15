// Express Framework
const express = require('express')
const app = express()
// MongoDB
const mongoose = require('mongoose')
//Body-parser
const bodyParser = require('body-parser')
// CORS
const cors = require('cors')

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        console.log("Connection to MongoDB successfully established")
    })
    .catch(() => {
        throw new Error("Could not establish connection to MongoDB");
    });


// using bodyParser urlencoded  and json extension for parsing frontend requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// CORS-enabled for all origins
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors())

app.options('*', cors())

// Using routes from file routes.js
app.use(require('./routes'))


module.exports = app