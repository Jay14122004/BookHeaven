const express =  require("express");
const Order = require("../models/order");
const {authenticateToken} = require("./userAuth");
const router = express();
const User = require("../models/user");

router.post("/place-order",authenticateToken,async(req,res)=>{
    try {
    const {id} = req.headers;
    const {order} = req.body;

    for (const orderData of order) {
        const orderDataFromDB = await Order.create({user:id,book:orderData._id});

        await User.findByIdAndUpdate(id,{$push:{orders:orderDataFromDB._id}});

        await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id}});
    }

        return res.status(200).json({
            status:"success",
            message:"Order placed Successfully"
        });
    } catch (error) {
        return res.status(500).json({message:"An error occured",error});
    }
});

router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;

        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        });

        const ordersData = userData.orders.reverse();
        return res.status(200).json({
            status:"success",
            data:ordersData,
        })
    } catch (error) {
        return res.status(500).json({message:"An error occured",error});
    }
});

router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {

        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having a access to admin work"});
        }

        const userData = await Order.find()
        .populate({
            path:"user",
        })
        .populate({
            path:"book"
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            status:"success",
            data:userData,
        })
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

router.put("/update-status/:orderid",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having a access to admin work"});
        }

        const {orderid} = req.params;
        await Order.findByIdAndUpdate(orderid,{
            status:req.body.status,
        });
        return res.status(200).json({
            status:"success",
            message:"status updated successfully",
        })

    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

module.exports = router;