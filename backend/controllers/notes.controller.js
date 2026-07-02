import User from "../models/user.model.js";
import Notes from "../models/notes.model.js"

export const activeCheck = async (req, res) => {
    return res.status(200).json({ 
        message: "Notes Route RUNNING"
    });
};


export const createNotes = async (req, res) => {

    try{

        const { token, title, description, semester, subject, chapter } = req.body;

        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not Found"});
        }

        const note = new Notes({
            title,
            description,
            semester,
            subject,
            chapter,
            fileName: req.file.filename,
            originalFileName: req.file.filename,
            uploadedBy: user._id
        });

        await note.save();

        return res.status(200).json({ message: "Notes Uploaded Successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }  
};

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find();

        return res.json(notes);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getNotesBySemester = async (req, res) => {
    try {
        const { semester } = req.query;

        const notes = await Notes.find({ semester });

        return res.json(notes);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const getNotesBySubject = async (req, res) => {
    try {
        const { subject } = req.query;

        const notes = await Notes.find({ subject });

        return res.json(notes);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getNotesById = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Notes.findById(id);

        if(!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const downloadViewNotes = async (req, res) => {
    try {
        const { noteId } = req.body;

        const note = await Note.findOne({ _id });
        res.sendfile('/uploads/'+ note.fileName);
        res.download(fileName);
        return res.json(notes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.body;

        const user = await User.findOne({ token });

        if (!user){
            return res.status(404).json({ message: "User not found"});
        }

        const note = await Notes.findById(id);

        if(!note) {
            return res.status(404).json({ message: "Note not Found" });
        }

        if (note.uploadedBy.toString() !== user._id.toString()) {
            return res.status(403).json ({ message: "Not authorized" });
        }

        await Notes.findByIdAndDelete(id);

        return res.json({ message: "Note deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const searchNotes = async (req, res) => {
    try {
        const { keyword } = req.query;

        const notes = await Notes.find({
            title: {
                $regex: keyword,
                $options: "i"
            }
        });

        return res.json(notes);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


