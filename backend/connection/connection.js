const mongoose = require("mongoose");
const conn = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("connected to DATABASE");
    }catch(error){
        console.log(error);
    }
};

conn();