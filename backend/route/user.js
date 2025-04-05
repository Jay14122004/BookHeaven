const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

router.post("/sign-up",async(req,res)=>{
    try{
        const {username,email,password,address} = req.body;

        if(username.length<4){
            return res.status(400).json({message:"Username length should be greater than 3"});
        }

        const exisitingUsername =await User.findOne({username});
        if(exisitingUsername){
            return res.status(400).json({message:"Username already exists"});
        }

        const exisitingEmail =await User.findOne({email});
        if(exisitingEmail){
            return res.status(400).json({message:"Email already exists"});
        }

        if(password.length<6){
            return res.status(400).json({message:"password's length should be greater than 5"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        await User.create({
            username,
            email,
            password:hashPassword,
            address,
        });

        return res.status(200).json({message:"signup successfully"});


    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});


router.post("/sign-in",async(req,res)=>{
    try{
        const {username,password} = req.body;

        const exisitingUser =await User.findOne({username});
        if(!exisitingUser){
            return res.status(400).json({message:"Invalid credentials"});
        }

        await bcrypt.compare(password,exisitingUser.password,(error,result)=>{
            if(result){
                const authClaims =[
                    {name:exisitingUser.username},
                    {role:exisitingUser.role},
                ];

                const token = jwt.sign({authClaims},"bookstore123",{
                    expiresIn:"30d",
                });

                return res.status(200).json({
                    id:exisitingUser._id,
                    role:exisitingUser.role,
                    token:token,
                });
            }else{
                return res.status(400).json({message:"Invalid Credentials"});
            }
        });
    

    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});

router.get("/get-user-information",authenticateToken,async(req,res)=>{
    
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
});

router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated successfully"});
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
})
module.exports = router;