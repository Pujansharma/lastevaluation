const expresss=require("express")
const noteRoute=expresss.Router();
const {todomodel}=require("../model/todosmodel")
const jwt=require("jsonwebtoken");
require('dotenv').config()

noteRoute.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,`${process.env.sercuritykey}`)
    try {
        if(decoded){
            const notes=await todomodel.find({"UserId":decoded.UserId})
            res.status(200).send(notes)
        }
    } catch (error) {
        res.status(400).send({"mssg":error})
    }
})
noteRoute.get("/",async(req,res)=>{
    let device=(req.query.device);
    if(device){
        let data=await todomodel.find({device:device});
        res.status(200).send(data);
    }else{
        let data=await todomodel.find();
        res.status(200).send(data);
    }
})

noteRoute.post("/add",async (req,res)=>{
    try {
        const note=new todomodel(req.body)
        await note.save()
        res.status(200).send({"mssg":"new data has been added"})
    } catch (error) {
        res.status(400).send({"mssg":error.message})
    }
})
noteRoute.patch("/update/:id",async(req,res)=>{
    try {
        let ID=req.params.id;
    let payload=req.body;
    const data=await todomodel.findByIdAndUpdate({_id:ID},payload);
    res.status(200).send({"msg":"data has been updated!"})
    } catch (error) {
        console.log(error.message);
        res.send({"mssg":"something went wrong"})
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    try {
        let ID=req.params.id;
    const data=await todomodel.findByIdAndDelete({_id:ID});
    res.status(200).send({"msg":"data has been deleted!"})
    } catch (error) {
        console.log(error.message);
        res.send({"mssg":"something went wrong"})
    }
})

module.exports={noteRoute}