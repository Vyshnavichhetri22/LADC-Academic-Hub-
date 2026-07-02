import { Router } from "express";
import { signup, login, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getMyProfile, forgotPassword, resetPassword } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route("/update_profile_picture")
    .post(upload.single("profile_picture"), uploadProfilePicture);


router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/get_my_profile").post(getMyProfile);
router.route("/forgot_password").post(forgotPassword);
router.route("/reset_password").post(resetPassword);

export default router;