import Announcements from "../models/announcements.model.js";
import User from "../models/user.model.js";


export const activeCheck = async (req, res) => {
    return res.status(200).json({ 
        message: "Announcement Route RUNNING"
    });
};

export const createAnnouncement = async (req, res) => {

    try {
        const { token, title, message } = req.body;

        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const announcement = new Announcements({
            title,
            message
        });

        await announcement.save();

        return res.status(200).json({ message: "Anouncement created Successfully!" });

    } catch (error) {
        return res.status(500).json({ message: error.nessage });
    }
};

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcements.find();

        return res.json(announcements);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};