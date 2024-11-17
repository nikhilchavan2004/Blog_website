import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { error } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next.error(400, "all fields are  required");
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const usr = new User({
    username,
    email,
    password: hashPassword,
  });
  await usr.save();
  res.status(201).json({
    message: "User created successfully",
    user: usr,
  });
};
export const signin =async(req,res,next)=>{
  res.status(200).json({message: "Signin route is working"})
  const {email,password}= req.body
  if (
  
    !email ||
    !password ||
    
    email === "" ||
    password === ""
  ) {
    next.error(400, "all fields are  required");
  }
  try{
    const userv = await User.findOne({username})
    if(!userv) return next.error(404, "User not found")
      const isMatch =  bcryptjs.compareSync(password, userv.password)
    if(!isMatch) return next.error(401, "Invalid password")

const token = jwt.sign
({id:userv._id},process.env.SECRET_KEY,{expiresIn:"15h"})


  }
  catch(err){
    next.error(500, "Internal server error")
  }
  }

