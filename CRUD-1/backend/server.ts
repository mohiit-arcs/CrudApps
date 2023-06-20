export {}

const express = require('express')
const app = express()


const cors = require('cors')
app.use(cors())

require('dotenv').config()

const PORT = process.env.PORT || 4000;

app.use(express.json())

const apiRoutes = require('./routes/employeeApi')

app.use('/apis/v1', apiRoutes)


const user = require('./routes/user')
app.use("/apis/v1", user)

const dbConnect = require('./config/database')
dbConnect()

app.listen( PORT, () => {
    console.log(`Server started at ${PORT}`)
})