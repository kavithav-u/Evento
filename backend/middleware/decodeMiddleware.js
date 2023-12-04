import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const checkUserStatus = asyncHandler(async (req, res, next) => {
  try {
    // Assuming you have a user ID stored in req.user._id after the protect middleware
    const userId = req.user._id;
    console.log(userId,"userIdffff")
    const user = await User.findById(userId).select('-password');

    if (user) {
      if (user.isActive) {
        // User is active, proceed with the request
        next();
      } else {
        // User is not active, clear the JWT cookie and log them out
        res.clearCookie('jwt');
        console.log("dfvdfgdgfdfdf")
        res.json({notActive:true, message: 'User is blocked' });
      }
    } else {
      // User not found, clear the JWT cookie and respond with an error
      res.clearCookie('jwt');
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that may occur during the user status check
    res.clearCookie('jwt');
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export { checkUserStatus };
