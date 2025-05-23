const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        required:true,
    },
    favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
    }],
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order",
    }],
},{timestamps:true});

const user = mongoose.model("user",userSchema);

module.exports=user;

