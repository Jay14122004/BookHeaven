const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");

router.post("/add-book",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having a access to admin work"});
        }
       
        await Book.create({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        })
        return res.status(200).json({message:"book added successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error",error:error});
    }
});

router.put("/update-book",authenticateToken,async(req,res)=>{
    try {

        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having a access to admin work"});
        }


        const {bookid} = req.headers;
       
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });

      
        return res.status(200).json({message:"book updated successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
});

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try {

        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"You are not having a access to admin work"});
        }

        
        const {bookid} = req.headers;

        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({message:"Book deleted successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
});

router.get("/get-all-books",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdBy:-1});

        return res.status(200).json({
            status:"success",
            data:books,
        });
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

router.get("/get-recent-books",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdBy:-1}).limit(4);

        return res.status(200).json({
            status:"success",
            data:books,
        });
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

router.get("/get-book-by-id/:bookid",async(req,res)=>{
    try{
        const id = req.params.bookid;
        const book =await Book.findById(id);
        return res.status(200).json({
            status:"success",
            data:book,
        })
    }catch(error){
        return res.status(500).json({message:"An error occured"});
    }
});

module.exports = router;