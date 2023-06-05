const express = require('express')
const taskRoutes = require('./routes/tasks')
const cors = require('cors')
const {constants} = require('./constants')
const bodyParser = require('body-parser')


const app = express()


// middleware
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))

app.use('/tasks', taskRoutes)

app.listen(constants.port)
