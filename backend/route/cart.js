const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");

router.put("/add-to-cart",authenticateToken,async(req,res)=>{

    try {
        const {id,bookid} = req.headers;
        const user = await User.findById(id);
        const isBookInCart = user.cart.includes(bookid);
        if(isBookInCart){
            return res.json({status:"success",message:"book is already in cart"});
        }

        await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.status(200).json({status:"success",message:"book is added in cart"});
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        
        
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        });

        return res.status(200).json({status:"success",message:"book is removed from cart"});
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.status(200).json({status:"success",data:cart});
    } catch (error) {
        return res.status(500).json({message:"An error occured"});   
    }
})

module.exports = router;