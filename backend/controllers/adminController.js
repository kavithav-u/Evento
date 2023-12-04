import  asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import dotenv from 'dotenv';
dotenv.config();
import { generateAdminToken } from '../utils/generateToken.js';

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.AdminEmail &&
      password === process.env.AdminPassword
    ) {
      generateAdminToken(res, email);
      res.status(200).json({ success: true, email, message: "login sucesss" });
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ message: "server Issue" });
  }
});


const getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "server issue" });
  }
};

const adminAction = async (req, res) =>{
  const userId = req.body.userId;
  try {
  const user = await User.findById(userId);
  if (user) {
    const updatedActiveStatus = !user.isActive;
    user.isActive = updatedActiveStatus;
    await user.save();

    const statusMessage = user.isActive?'activated' : 'blocked'
  res.status(200).json({success: true, message:"User ${statusMessage} Successfully",isActive:updatedActiveStatus})
  } else {
    res.status(404).json({ message: "User not found" });
  }
} catch (error) {
  console.error("Error updating user:", error);
  res.status(500).json({ success: false, message: "Server error" });
}
};





const adminLogout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out successfully" });
};
  


  export {
    adminLogout,
    adminLogin,
    getUserList,
    adminAction
  }