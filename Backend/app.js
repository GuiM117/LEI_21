
require('dotenv').config()

const app = require('./server/server')

const PORT = process.env.APP_PORT

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
