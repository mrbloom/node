const express = require("express")
const app = express()

app.listen(3000,()=>{
    console.log("ddddd")
})

app.get('/',(req,res)=>{
    res.send("Yi asw")
})
