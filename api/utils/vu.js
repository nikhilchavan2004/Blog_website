import jwt from "jsonwebtoken"
import {error} from "./error.js"
export const vu=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(error(401,"No token provided"))
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
    if(err) return next(error(500,"Failed to authenticate token"))
        req.user=user
    next()
    })
    }

