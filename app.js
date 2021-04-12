const express = require("express")
const proccess = require("process")

const app = express()
const port = proccess.env.PORT || 3000
console.log(`PORT = ${port}`)

app.listen(port,()=>{
    console.log("ddddd")
})

app.get('/',(req,res)=>{
    res.send("Yi asw bimba")
})
