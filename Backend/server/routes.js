const express = require('express')
const app = express.Router();

app.use('/meds', require('../src/routes/activeSubs'));
app.use('/users', require('../src/routes/users'));
app.use('/patients', require('../src/routes/patients'))
app.use('/entry', require('../src/routes/entry'))
app.use('/prescriptions', require('../src/routes/prescription'))

module.exports = app;