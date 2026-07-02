import { Router } from "express";
// import { createImpQns, getImpQnsBySemester, getImpQnsBySubject, getImpQnsByChapter, searchImpQns, updateImpQns, deleteImpQns } from "../controllers/importantQuestions.controller.js";

import { createImpQns } from "../controllers/importantQuestions.controller.js";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

const upload = multer({ storage: storage })

router.route("/upload_impQns").post(upload.single("file"), createImpQns);
// router.route("/get_impQns_by_semester").get(getImpQnsBySemester);
// router.route("/get_impQns_by_subject").get(getImpQnsBySubject);
// router.route("/get_impQns_by_chapter").get(getImpQnsByChapter);
// router.route("/search_impQns").get(searchImpQns);
// router.route("/update_impQns").put(updateImpQns);
// router.route("/delete_impQns").delete(deleteImpQns);

export default router;