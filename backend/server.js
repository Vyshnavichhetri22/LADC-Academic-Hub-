import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import importantQuestionsRoutes from "./routes/importantQuestions.routes.js";
import announcementsRoutes from "./routes/announcements.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(importantQuestionsRoutes);
app.use(announcementsRoutes);
app.use(notesRoutes);
app.use(userRoutes);
app.use("/uploads", express.static("uploads"));

const start = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.ATLASDB_URL);
        console.log("MongoDB Connected");
        console.log("Connected DB:", mongoose.connection.name);
        
        const PORT = process.env.PORT || 9090;

        app.listen(9090, () => {
           console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log("Database Error:");
        console.log(err);
    }    
};
start();