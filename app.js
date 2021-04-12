const express = require("express")
const proccess = require("process")

const app = express()
const port = proccess.env.port || 3000

app.listen(port,()=>{
    console.log("ddddd")
})

app.get('/',(req,res)=>{
    res.send("Yi asw")
})
