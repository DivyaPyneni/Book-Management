const mongoose=require("mongoose");

const books=new mongoose.Schema({
    userId:{ type: mongoose.SchemaTypes.ObjectId, ref: "User"},
    title:{type:String,required:true},
    brief:{type:String},
    category:{type:String,required:true},
    subCategory:[{type:String,default:[]}],
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date,default:null}
},{timestamps:true})

module.exports=mongoose.model("Books",books);