const express=require('express')
const {ServerConfig,Logger}=require('./config')
const knex=require('./db/knex')
const apiRoutes=require('./routes')


const app=express()
app.use('/api',apiRoutes)

knex.raw('SELECT 1')
.then(()=>{
    app.listen(ServerConfig.PORT,()=>{
    console.log(`server is running on port_no ${ServerConfig.PORT}`)
    // Logger.info("Successfuly started the server","root",{})
})
})
.catch((err)=>{
    console.log('pls try again',err)
})
