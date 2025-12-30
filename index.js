const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// template engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// body response
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())



conn
.sync()
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err))