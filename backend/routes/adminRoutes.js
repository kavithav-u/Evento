import express from "express";
const router = express.Router();
import { adminLogin, adminLogout, getUserList, adminAction } from "../controllers/adminController.js";
import { adminAuthProtect } from "../middleware/adminauthMiddleware.js";
import { adminActionEvent, editEvent, getAllEvent, getAllEvents, newEvent } from "../controllers/eventController.js";
import { adminActionHall, editHall, getAllHalls, getHallDetails, newHall } from "../controllers/hallController.js";
import { addNewCatering, adminActionCatering, getAllCaterings, getEventsDetails } from "../controllers/cateringController.js";
import { deleteBanner, editBanner, getAllBanner, newBanner } from "../controllers/bannerController.js";
import { deleteAbout, getAbout, newAbout, updateAbout } from "../controllers/aboutController.js";
import { deleteGallery, editGallery, getGallery, newGallery } from "../controllers/galleryController.js";
import { adminActionBookings, getAllBookings } from "../controllers/bookingController.js";

router.post('/',adminLogin);
router.post('/logout', adminLogout);
router.route('/userlist').get(getUserList).put(adminAction);
router.get('/events', getAllEvent);
router.put('/events',adminAuthProtect,adminActionEvent);
router.post('/events/new', adminAuthProtect,newEvent);
router.put('/events/edit',adminAuthProtect,editEvent)
router.get('/halls', adminAuthProtect,getAllHalls);
router.put('/halls', adminAuthProtect,adminActionHall);
router.post('/halls/new', adminAuthProtect,newHall);
router.get('/halls/new', adminAuthProtect,getHallDetails);
router.put('/halls/edit', adminAuthProtect,editHall);
router.get('/caterings', adminAuthProtect,getAllCaterings);
router.get('/caterings/new', adminAuthProtect,getEventsDetails);
router.put('/caterings',adminAuthProtect,adminActionCatering);
router.post('/caterings/new', adminAuthProtect,addNewCatering);
router.get('/banner',adminAuthProtect,getAllBanner);
router.post('/banner/new',adminAuthProtect,newBanner)
router.put('/banner/edit',adminAuthProtect,editBanner)
router.post('/banner/delete',adminAuthProtect,deleteBanner)
router.get('/about',adminAuthProtect,getAbout);
router.post('/about/new',adminAuthProtect,newAbout);
router.put('/about/edit', adminAuthProtect,updateAbout);
router.post('/about/delete', adminAuthProtect,deleteAbout);
router.get('/gallery',adminAuthProtect,getGallery);
router.post('/gallery/new',adminAuthProtect,newGallery);
router.put('/gallery/edit', adminAuthProtect,editGallery);
router.post('/gallery/delete',adminAuthProtect, deleteGallery);
router.get('/bookings',adminAuthProtect,getAllBookings);
router.put('/bookings', adminAuthProtect,adminActionBookings);






export default router;