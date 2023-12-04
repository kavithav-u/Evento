import  express  from "express";
const router = express.Router();
import { loginUser,
    registerUser,
    homeUser,
    getUserProfile,
    updateUserProfile, 
    logoutUser, 
    googleAuth, 
    verifyOTP, 
    updatePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkUserStatus } from "../middleware/decodeMiddleware.js";
import {getAllEvents} from '../controllers/eventController.js'
import { fetchListing, getAboutData, getCateringDetails, getDetails, getSearchListing,filterSearch } from "../controllers/listingController.js";
import { newBookings,getBookings, cancelBookings } from "../controllers/bookingController.js";
import { fectchImages } from "../controllers/galleryController.js";


router.get('/',homeUser);
router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/otp',verifyOTP)
router.post('/logout',logoutUser);
router.put('/updatePassword', updatePassword);
router.post('/googleAuth',googleAuth);
router.get('/profile',protect,checkUserStatus,getUserProfile);
router.put('/profile',protect,checkUserStatus,updateUserProfile)
// router.route('/profile').get(protect,checkUserStatus,getUserProfile).put(protect,checkUserStatus,updateUserProfile)
router.get('/services',getAllEvents)
router.get('/listing/:eventId', fetchListing);
router.get('/details/:hallId',getDetails);
router.get('/details/:cateringId',getCateringDetails);
router.get('/about',getAboutData);
router.post('/bookings',protect,checkUserStatus, newBookings);
router.get('/bookings/:userId', protect,checkUserStatus,getBookings);
router.put('/cancelBooking',protect,checkUserStatus,cancelBookings)
router.get('/gallery',fectchImages);
router.get('/search',getSearchListing);
router.post('/search',filterSearch);
export default router;