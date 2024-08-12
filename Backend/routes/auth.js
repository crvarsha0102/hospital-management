import express from "express";
import UserModel from "../models/User.js";

const authRouter = express.Router();

authRouter.post('/createAccount', async (req, res) => {
    const {name, email , password} = req.body;

    if(!name  || !email || !password || password.length < 5){
        return res.status(301).json({err : "Invalid credentials"+ name + email + password });
    }

    const user = await UserModel.findOne({email : email});

    if(user){
        console.log(user)
        return res.status(301).json({err : "User already exists"});
    }

    const newUser = await UserModel.create({name,email,password});

    const returnUser = {...newUser.toJSON()}

    delete returnUser.password

    return res.status(200).json(returnUser);

})

authRouter.post('/login', async (req, res) => {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email : email});

    if(!user){
        return res.status(404).json({err : "User not found"});
    }

    if(user.password !== password){
        return res.status(301).json({err :"Incorrect password"})
    }

    return res.status(200).json({message : "Logged in successfully"})
})


export default authRouter;