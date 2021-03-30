const express = require('express')
const app = express.Router();

app.use('/meds', require('../src/routes/meds'));
app.use('/users', require('../src/routes/users'));

module.exports = app;