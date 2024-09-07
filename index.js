require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")
const Post = require("./src/resources/posts/model")

const app =express()
const port = process.env.PORT ||6000
const db_url = process.env.db_url
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())



require("./src/routes")(app);
app.all("*",(req,res,next)=>{
    res.status(200).json({msg:"Error not found"})
})


app.use((err,req,res,next)=>{
    res.status(400).json({error:err.message})
})
mongoose.connect(db_url).then(()=>{
    app.listen(port,()=>console.log(`Server is running on port ${port}`))
})