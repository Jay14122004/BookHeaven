const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");

router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{

    try {
        const {id,bookid} = req.headers;
        const user = await User.findById(id);
        const isBookFavourite = user.favourites.includes(bookid);
        if(isBookFavourite){
            return res.json({message:"book is already in favourites"});
        }

        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"book is added to favourites"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error});
    }
});


router.put("/remove-book-from-favourite",authenticateToken,async(req,res)=>{

    try {
        const {id,bookid} = req.headers;
        const user = await User.findById(id);
        const isBookFavourite = user.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }

        return res.status(200).json({message:"book is removed from favourites"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
});


router.get("/get-favourite-books",authenticateToken,async(req,res)=>{

    try {
        const {id} = req.headers;
        const user = await User.findById(id).populate("favourites");

        const favouriteBooks = user.favourites;

        return res.status(200).json({status:"success",data:favouriteBooks});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
});

module.exports = router;
