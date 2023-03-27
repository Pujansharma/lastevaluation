const mongoose=require("mongoose");


const modelschema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    UserID:String
})

const todomodel=mongoose.model("userdata",modelschema);
module.exports={todomodel}

// title ==> String
// body ==> String
// device ==> String
// no_of_comments ==> Number