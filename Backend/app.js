const povoamento = require('./src/utilities/dataset')
require('dotenv').config()

const app = require('./server/server')


app.listen(process.env.APP_PORT, () => {
    povoamento
    console.log(`Server listening on port ${process.env.APP_PORT}`)
})
