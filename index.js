const express=require("express");
const {connection}=require("./config/config");
const {userRouter}=require("./routes/user")
const {noteRoute}=require("./routes/todos")
const {auth}=require("./midlleware/middleware")
const cors=require("cors")
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/user",userRouter)
app.use(auth)
app.use("/data",noteRoute)
app.listen(4600,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is ruinning on port 4600")
})