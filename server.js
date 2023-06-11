const app = require('./app')
const { mongoConn } = require('./databases/configurationBD')
const dotenv = require('dotenv').config()

app.set('port', process.env.PORT || 3001)//middleware

const conn = mongoConn()

app.listen(app.get('port'), () => {
    console.log(`arrancó por puerto: ${app.get('port')}`)
})