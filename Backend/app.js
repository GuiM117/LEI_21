//const povoamento = require('./src/utilities/dataset')
require('dotenv').config()

const app = require('./server/server')


app.listen(process.env.APP_PORT, () => {
    // para já comentar a linha após ligar o servidor
    //povoamento
    console.log(`Server listening on port ${process.env.APP_PORT}`)
})
