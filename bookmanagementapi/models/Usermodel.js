const mongoose=require("mongoose");

const user=new mongoose.Schema({
    title:{type:String,required:true},
    username:{type:String,required:true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value) =>
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
          message:`Please enter a valid email address`,
        },
      },
    password:{type:String,required:true},
},{timestamps:true})




module.exports=mongoose.model("User",user);
