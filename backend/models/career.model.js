import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    title: String,

    category: {
        type: String,
        enum: [
            "Web Development",
            "Mobile Development",
            "AI/ML",
            "Cyber Security",
            "Data Science",
            "UI/UX"
        ]
    },

    description: String,

    roadmap: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Career = mongoose.model("Career", careerSchema);

export default Career;