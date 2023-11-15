import  asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
let storedOTP;




const homeUser = asyncHandler(async (req, res) => {
    res.status(200).json({message:"Home User"})
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (user.isActive) {
      if (await user.matchPassword(password)) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }  } else {
    res.status(403); // 403 Forbidden - User is not active
    throw new Error("User is blocked. Please contact support.");
  }
} else {
  res.status(401);
  throw new Error("Invalid email or password");
}
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, } = req.body;
  console.log(email,"EMAIL")
  try {
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const otp = Math.floor(1000+Math.random()*9000).toString();
    console.log(otp,"OTP")
    storedOTP = otp;
    console.log(storedOTP,"OTPs")

    const transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:465,
      secure:true,
      auth : {
        user:process.env.RECOVER_EMAIL,
        pass:process.env.RECOVER_EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        minVersion: 'TLSv1',
      },
    });
    console.log(transporter,"ERERER")

    const mailOptions = {
      from: process.env.RECOVER_EMAIL,
      to:email,
      subject:`Hy, The OTP for registering your account is 
      OTP:${otp}`,
    };
    console.log(mailOptions,"ERERER")


    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({message:'Error sending email.',success:false});
    } else {
      return res.status(200).json({success:true, message:'OTP send Successfully'})
    }
  });
} }catch (error) {
  res.status(500).json({message:"Intenal server Error", success:false})
}
});

const verifyOTP = async (req, res) => {
  const { name, email, password, enteredOTP } = req.body;
  console.log(enteredOTP, "Entered OTP");
  console.log(req.body, "Request Body");
  console.log(storedOTP, "Stored OTP");

  try {
    if (storedOTP === enteredOTP) {
      // Create a new user with the hashed password
      const newUser = await User.create({
        name,
        email,
        password,
      });

      console.log(newUser, "New User");

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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: 'User Logged out successfully' });
  };
  

  const getUserProfile = asyncHandler(async (req, res) => {
    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  const uploadProfileImage = async (req, res) => {
    try {
      const imageUrl = req.body.imageUrl;
      const userId = req.body.userId;
      const user = await User.findById(userId);
      console.log(user, "USER");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.image = imageUrl;
      console.log("DDD");
      await user.save();

      return res
        .status(200)
        .json({
          user,
          success: true,
          message: "Image uploaded and user data updated",
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  const updateUserProfile = asyncHandler(async (req, res) => {
    console.log("EFVCDFCDSCSD")
    const user = await User.findById(req.user._id);
    console.log(user,"RESE")

    if (user) {
      console.log("EDCRFVTGB")
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      console.log("req.body.passwordsssss1",req.body.password)

      if (req.body.password) {
        console.log("req.body.password",req.body.password)
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });


  const googleAuth = asyncHandler (async(req,res)=> {
    const {name, email, image} = req.body;
    console.log(req.body,"EEE");

    const user = await User.findOne({email});
    console.log(user,"RESDSFSDF")

    if(user) {
      
      generateToken(res,user._id);
      res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        image:user.image
      })
    } else {
      let password = "123456@";
      const newUser = await User.create ({
      name,
      email,
      password,
      image
      })
    if(newUser) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  }
  })


export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    homeUser,
    uploadProfileImage,
    googleAuth,
    verifyOTP
}