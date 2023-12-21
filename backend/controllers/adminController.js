import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import dotenv from "dotenv";
import Hall from '../models/hallModels.js';
dotenv.config();
import { generateAdminToken } from "../utils/generateToken.js";
import Booking from "../models/bookingsSchema.js";

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("req.body", req.body);
    if (
      email === process.env.AdminEmail &&
      password === process.env.AdminPassword
    ) {
      // console.log("admin login");

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

const adminAction = async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (user) {
      const updatedActiveStatus = !user.isActive;
      user.isActive = updatedActiveStatus;
      await user.save();

      const statusMessage = user.isActive ? "activated" : "blocked";
      res.status(200).json({
        success: true,
        message: "User ${statusMessage} Successfully",
        isActive: updatedActiveStatus,
      });
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

const getDashboard = async (req, res) => {
  try {
    const aggregatePipeline = [
      // Lookup with Hall collection
      {
        $lookup: {
          from: 'halls',
          localField: 'hall',
          foreignField: '_id',
          as: 'hallData',
        },
      },
      // Unwind the array created by the lookup
      {
        $unwind: '$hallData',
      },
      // Lookup with Event collection
      {
        $lookup: {
          from: 'events',
          localField: 'hallData.events',
          foreignField: '_id',
          as: 'eventData',
        },
      },
      // Unwind the array created by the second lookup
      {
        $unwind: '$eventData',
      },
      // Group by event and calculate total sales
      {
        $group: {
          _id: '$eventData._id',
          eventType: { $first: '$eventData.eventType' },
          totalSales: { $sum: { $toInt: '$totalAmount' } }, // Convert totalAmount to integer if it's stored as a string
        },
      },
    ];
    
    // Execute the aggregation pipeline
    Booking.aggregate(aggregatePipeline)
      .then(result => {
        console.log(result,"GGGG");
        
      })
      .catch(error => {
        console.error(error);
      });
    
      const eventSales = await Booking.aggregate(aggregatePipeline);
      console.log("month",eventSales)

    const monthlySales = await Booking.aggregate([
      {
        $match: {
          status: "confirmed",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalSales: { $sum: { $toDouble: "$totalAmount" } },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
   
    const TotalSales = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $toDouble: "$totalAmount" } },
        },
      },
    ]);
    const booking = await Booking.find().count();
    const TotalUsers = await User.find().count();
    res
      .status(200)
      .json({
        success: true,
        message: "success",
        TotalSales,
        monthlySales,
        booking,
        eventSales,
        TotalUsers,
      });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export { adminLogout, adminLogin, getUserList, adminAction, getDashboard };
