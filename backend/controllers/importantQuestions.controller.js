import User from "../models/user.model.js";
import ImportantQuestions from "../models/importantQuestions.model.js";

export const createImpQns = async (req, res) => {
     console.log("CREATE IMP QNS API CALLED");
    try {
        const { token, title, semester,  subject, chapter } = req.body;

        console.log(req.body);
        console.log(req.file);
        
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const impQns = new ImportantQuestions({
            title,
            semester,
            subject,
            chapter,
            fileName: req.file.filename,
            uploadedBy: user._id
        });

        await impQns.save();

        return res.status(200).json({ message: "Important Questions uploaded Successfully!" });

    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

