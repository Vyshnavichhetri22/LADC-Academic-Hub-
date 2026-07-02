import { Router } from "express";
import { createNotes, getAllNotes, getNotesBySemester, getNotesBySubject, getNotesById, deleteNote, searchNotes } from "../controllers/notes.controller.js";
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

router.route("/upload_notes").post(upload.single("file"), createNotes);
router.route("/get_notes_by_semester").get(getNotesBySemester);
router.route("/get_notes_by_subject").get(getNotesBySubject);
router.route("/get_all_notes").get(getAllNotes);
router.route("/get_notes_by_id/:id").get(getNotesById);
router.route("/delete_note").delete(deleteNote);
router.route("/search_notes").get(searchNotes);

export default router;