const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
    },
    status:{
        type:String,
        default:"Order placed",
        enum:["Order placed","Out for delivery","Delivered","Canceled"],
    },
},{timestamps:true});

const order = mongoose.model("order",orderSchema);
module.exports = order;
