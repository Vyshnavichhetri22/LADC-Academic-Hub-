import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: String,

    description: String,

    semester: Number,

    githubLink: String,

    reportPdf: String,

    proposalPdf: String,

    projectVideo: String,

    technologies: [String],

    teamMembers: [String],

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProjectRepository = mongoose.model("ProjectRepository");

export default ProjectRepository;