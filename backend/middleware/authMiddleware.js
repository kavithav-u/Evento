import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';


const protect = asyncHandler (async(req,res, next)=>{
    let token;
    token = req.cookies.jwt;
    console.log(token,"TOKEN")

    if (token) {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("asdfghjghgjhgfjhg")
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error ) {
            res.status (401);
            throw new Error('Not authorized, Invalid token')
        }
    } else {
        res.status(401);
        throw new Error('Not authorizedsss, no token'); 
    }
})

export {
    protect
};