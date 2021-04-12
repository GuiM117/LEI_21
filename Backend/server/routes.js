const express = require('express')
const app = express.Router();

app.use('/meds', require('../src/routes/meds'));
app.use('/users', require('../src/routes/users'));
app.use('/patients', require('../src/routes/patients'))
app.use('/prescription', require('../src/routes/prescription'))

module.exports = app;