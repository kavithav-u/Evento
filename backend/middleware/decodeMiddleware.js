import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const checkUserStatus = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');

    if (user) {
      if (user.isActive) {
        next();
      } else {
        res.clearCookie('jwt');
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
