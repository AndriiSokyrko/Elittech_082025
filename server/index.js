require('dotenv').config()
const db = require('./models/index');
const express = require('express')
const sequelize = require('./db')
const passport = require('passport')
require('./config/passport')

const cors = require('cors')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000
const app =  express()

const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlerMiddleware')

const path = require('path')


app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)
app.use(errorHandler)

app.use('/api-docs', express.static(path.join(__dirname, 'swagger')));

const start = async ()=>{
    try {
        await db.sequelize.authenticate()
        await db.sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server is running on the port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
