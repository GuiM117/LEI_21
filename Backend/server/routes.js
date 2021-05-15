const express = require('express')
const app = express.Router()

app.use('/meds', require('../src/routes/dataset/activeSubs'))
app.use('/dci', require('../src/routes/dataset/dci'))
app.use('/pharmForm', require('../src/routes/dataset/pharmForm'))
app.use('/unitMed', require('../src/routes/dataset/unitMed'))
app.use('/viaAdmin', require('../src/routes/dataset/viaAdmin'))
app.use('/interactions', require('../src/routes/dataset/interactions'))
app.use('/users', require('../src/routes/users'))
app.use('/patients', require('../src/routes/patients'))
app.use('/entry', require('../src/routes/entry'))
app.use('/prescriptions', require('../src/routes/prescription'))

module.exports = app;