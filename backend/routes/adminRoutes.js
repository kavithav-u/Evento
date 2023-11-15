import express from "express";
const router = express.Router();
import { adminLogin, adminLogout, getUserList, adminAction } from "../controllers/adminController.js";
import { adminAuthProtect } from "../middleware/adminauthMiddleware.js";
import { adminActionEvent, editEvent, getAllEvent, getAllEvents, newEvent } from "../controllers/eventController.js";
import { adminActionHall, getAllHalls, getHallDetails, newHall } from "../controllers/hallController.js";
import { addNewCatering, adminActionCatering, getAllCaterings, getEventsDetails } from "../controllers/cateringController.js";
import { deleteBanner, editBanner, getAllBanner, newBanner } from "../controllers/bannerController.js";
import { deleteAbout, getAbout, newAbout, updateAbout } from "../controllers/aboutController.js";

router.post('/',adminLogin);
router.post('/logout', adminLogout);
router.route('/userlist').get(getUserList).put(adminAction);
router.get('/events', getAllEvent);
router.put('/events',adminActionEvent);
router.post('/events/new', newEvent);
router.put('/events/edit',editEvent)
router.get('/halls', getAllHalls);
router.put('/halls', adminActionHall);
router.post('/halls/new', newHall);
router.get('/halls/new', getHallDetails);
router.get('/caterings', getAllCaterings);
router.get('/caterings/new', getEventsDetails);
router.put('/caterings',adminActionCatering);
router.post('/caterings/new', addNewCatering);
router.get('/banner',getAllBanner);
router.post('/banner/new',newBanner)
router.put('/banner/edit',editBanner)
router.post('/banner/delete',deleteBanner)
router.get('/about',getAbout);
router.post('/about/new',newAbout);
router.put('/about/edit', updateAbout);
router.post('/about/delete', deleteAbout);








export default router;