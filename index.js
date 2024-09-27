// const appMiddleware = require('./Middlewares/appMiddleware')
const router = require('./Router/router')
//importdotenv
require('dotenv').config()

//2) import express modules
const express = require('express')

require('./DB/connections')
//import cors module
const cors = require('cors')
// create server using express
const pfServer = express()
// inject cors into pfServer 
pfServer.use(cors());

// 6) use middle ware to conver JSON data to js object

pfServer.use(express.json())
//Application Middleware 
// pfServer.use(appMiddleware)

pfServer.use(router)
//pfserver should expose the 
pfServer.use('/uploads',express.static('./uploads'))
//7) provide Port
const PORT = 4000;
// 8) Run the server 
pfServer.listen(PORT, () => {
    console.log(`pf servr is runig in port ${PORT}`)
})

pfServer.get('/', (req, res) => { 
    res.send("server for project")
})