import mongoose from "mongoose";

const importantQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    chapter: String,

    fileName: {
        type: String,
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ImpQns = mongoose.model("ImportantQuestions", importantQuestionSchema);
export default ImpQns;