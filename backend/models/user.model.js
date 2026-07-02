import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    },

    semester: {
        type: Number,
        min: 1,
        max: 8,
        default: 1
    },

    profilePicture: {
        type: String,
        default: "default.jpg"
    },

    bio: {
        type: String,
        default: ""
    },

    token: {
        type: String,
        default: ""
    },
    
    resetToken: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

export default User;