import  express  from "express";
const router = express.Router();
import { loginUser,
    registerUser,
    homeUser,
    getUserProfile,
    updateUserProfile, 
    uploadProfileImage,
    logoutUser, googleAuth, verifyOTP } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {getAllEvents} from '../controllers/eventController.js'
import { fetchListing, getAboutData, getCateringDetails, getDetails } from "../controllers/listingController.js";


router.post('/',homeUser);
router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/otp',verifyOTP)
router.post('/logout',logoutUser);
router.put('/profileimage', uploadProfileImage);
router.post('/googleAuth',googleAuth)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.get('/services',getAllEvents)
router.get('/listing/:eventId', fetchListing);
router.get('/details/:hallId',getDetails);
router.get('/details/:cateringId',getCateringDetails);
router.get('/about',getAboutData);

export default router;