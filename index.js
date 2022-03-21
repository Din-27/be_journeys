const express = require('express')
require('dotenv').config()
const router = require('./src/routes')
const app = express()
const cors = require('cors')
// const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

// app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))

app.listen(port, ()=> console.log(`Hello author ${port}`))
