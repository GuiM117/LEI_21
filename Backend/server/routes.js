const express = require('express')
const app = express.Router();

app.use('/meds', require("../src/routes/meds"));

module.exports = app;