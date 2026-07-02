import mongoose from "mongoose";

const resumeTemplateSchema = new mongoose.Schema({
    title: String,

    templateFile: String,

    description: String,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const ResumeTemplate = mongoose.model("ResumeTemplate", resumeTemplateSchema);

export default ResumeTemplate;
