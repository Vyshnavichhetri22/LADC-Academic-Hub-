import { Router } from "express";
import { createAnnouncement, getAllAnnouncements } from "../controllers/announcements.controller.js";
 


const router = Router();

router.route("/createAnnouncement").post(createAnnouncement);
router.route("/getAllAnnouncements").post(getAllAnnouncements);


export default router;