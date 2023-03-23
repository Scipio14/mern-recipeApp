import {Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/Users.js'
// import {config} from 'dotenv';
// config();

const router = Router();

router.post('/register',async(req,res)=>{
  const {username,password} = req.body;
  try {
   const user = await User.findOne({username});

   if(user){
    return res.status(400).json({message:"User already exists"});
   }

   const hashedPassword = await bcrypt.hash(password,10);
   const newUser =  await new User({username,password:hashedPassword});
   await newUser.save();
   return res.status(201).json({"message":"User registered successfully"})
  }catch(error){
    return res.status(500).json({message:error.message})
}
})
router.post('/login',async(req,res)=>{
  const {username,password} = req.body;

  try {
    const user = await User.findOne({username});

    if(!user){
     return res.status(401).json({message:"Username or password is incorrect"});

    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
      res.status(401).json({message:"Username or password is incorrect"});
      return;   
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.json({token,userID:user._id});
    

  } catch (error) {
    return res.status(500).json({message:error.message});
  }
})

export default router;