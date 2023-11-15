import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import dotenv from 'dotenv';
dotenv.config();


const adminAuthProtect =  asyncHandler(async(req,res) => {
    try {
    let token;

    token = req.cookies.jwt;

    if(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        next();
    }  else {
        res.status(401).json({valid:false, message: "Not authorized, no token" });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  });

export {
    adminAuthProtect
  }