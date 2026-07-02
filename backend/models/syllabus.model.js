import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
    semester: Number,

    subject: String,

    syllabusPdf: String,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);

export default Syllabus;