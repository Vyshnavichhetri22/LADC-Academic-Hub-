import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    resourceId: mongoose.Schema.Types.ObjectId,

    resourceType: String
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;