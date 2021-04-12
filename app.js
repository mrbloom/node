const express = require("express")
const app = express()
const port = proccess.env.port || 3000
app.listen(3000,()=>{
    console.log("ddddd")
})

app.get('/',(req,res)=>{
    res.send("Yi asw")
})
