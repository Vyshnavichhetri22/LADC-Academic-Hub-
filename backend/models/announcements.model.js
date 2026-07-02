import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: String,

    message: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Announcements = mongoose.model("Announcements", announcementSchema);

export default Announcements;