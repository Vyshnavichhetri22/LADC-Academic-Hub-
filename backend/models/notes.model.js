import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,

    chapter: String,

    description: String,
    
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },

    subject: {
        type: String,
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    uploadedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model("Notes", noteSchema);

export default Notes;