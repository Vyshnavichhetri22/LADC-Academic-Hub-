import mongoose from "mongoose";

const pastPaperSchema = new mongoose.Schema({
    year: Number,

    semester: Number,

    subject: String,

    pdfFile: String,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const PastQuestionPapers = ("PastQuestionPapers", pastPaperSchema);

export default PastQuestionPapers;