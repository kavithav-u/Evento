import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import Banner from "../models/bannerModel.js";
import Event from "../models/eventModels.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";
function generateRandomPassword(length) {
  return crypto.randomBytes(length).toString("hex");
}

function generateUuid() {
  return crypto.randomBytes(16).toString("hex");
}

dotenv.config();
let storedOTP;

const homeUser = asyncHandler(async (req, res) => {
  try {
    const Banners = await Banner.findOne({ page: "Home" });

    const services = await Event.find().limit(6);
    res
      .status(200)
      .json({ success: true, Banners, services, message: "Home User" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (user.isActive) {
      console.log("sdafasdfasdfdfsfasdfasdfasdfasdfasdf")
      if (await user.matchPassword(password)) {
        console.log("entered")
        generateToken(res, user._id);

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isActive: user.isActive,
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    } else {
      res.status(403);
      throw new Error("User is blocked. Please contact support.");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      console.log(otp, "OTP");
      storedOTP = otp;
      console.log(storedOTP, "OTPs");

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.RECOVER_EMAIL,
          pass: process.env.RECOVER_EMAIL_PASS,
        },
        tls: {
          ciphers: "SSLv3",
          minVersion: "TLSv1",
        },
      });

      const mailOptions = {
        from: process.env.RECOVER_EMAIL,
        to: email,
        subject: `Hy, The OTP for registering your account is 
      OTP:${otp}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Error sending email.", success: false });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "OTP send Successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Intenal server Error", success: false });
  }
});

const verifyOTP = async (req, res) => {
  const { name, email, password, enteredOTP } = req.body;

  try {
    if (storedOTP === enteredOTP) {
      // Create a new user with the hashed password
      const newUser = await User.create({
        name,
        email,
        password,
        createdAt: Date.now(),
      });
      generateToken(res, newUser._id);

      return res.status(200).json({ success: true, user: newUser });
    } else {
      return res.status(200).json({ success: false, message: "Incorrect OTP" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create user", error });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out successfully" });
};

const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isActive: req.user.isActive,
      number: req.user.number,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updatePassword = async (req, res) => {
  try {
    const password = req.body.password;

    const userId = req.body._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (req.body.password) {
        user.password = req.body.password;
      }
    }
    const newPassword = await user.save();

    return res.status(200).json({
      password: newPassword.password,
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.number = req.body.number || user.number;
    user.image = req.body.image || user.image;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      number: updatedUser.number,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const googleAuth = asyncHandler(async (req, res) => {
  const { name, email, image } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      // isActive:user.isActive
    });
  } else {
    const randomPassword = generateRandomPassword(8);
    const uniqueId = generateUuid(16);
    const newUser = await User.create({
      name,
      email,
      password: randomPassword,
      image,
      uniqueId,
      // isActive
    });
    await sendPasswordEmail(email, randomPassword);
    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      });
    }
  }
});

async function sendPasswordEmail(email, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.RECOVER_EMAIL,
      pass: process.env.RECOVER_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.RECOVER_EMAIL,
    to: email,
    subject: "Your Random Password",
    text: `Your random password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  homeUser,
  updatePassword,
  googleAuth,
  verifyOTP,
};
