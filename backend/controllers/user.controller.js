import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const signup = async (req, res) => {
    try {

        const { fullName, username, email, password, semester, bio } = req.body;

        if (!fullName || !username || !email || !password )
            return res.status(200).json({ message: "All fields are required" })

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            semester: semester || 1,
            bio: bio || ""
        });

        await newUser.save();

        return res.json({ message: "User Created"});
    
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: user._id }, { token });

        return res.json({ token })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const uploadProfilePicture = async (req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.profilePicture = req.file.filename;

        await user.save();

        return res.json({ message: "Profile Picture Updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {

    try{
        const { token, ...newUserData } = req.body;

        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const { username, email } = newUserData;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser || String(existingUser._id) !== String(user._id)) {
                return res.status(400).json({ message: "User already exists" })
            }
        }

        Object.assign(user, newUserData);

        await user.save();

        return res.json({ message: "User Updated" })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserAndProfile = async (req, res) => {

    try {
        const { token } = req.body;

        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const userProfile = await User.findOne({ userId: user._id })
            .populate('userId', 'name email username profilePicture');

            return res.json(userProfile);
            
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const updateProfileData = async (req, res) => {
    
    try {
        const { token, fullName, username, semester, bio } = req.body;

        const userProfile = await User.findOne({token: token});

        if (!userProfile) {
            return res.status(404).json({ message: "User not found" })
        }

        if (fullName) userProfile.fullName = fullName;
        if (username) userProfile.username = username;
        if (semester) userProfile.semester = semester;
        if (bio) userProfile.bio = bio;

        await userProfile.save();

        return res.json({ message: "Profile Updated" });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMyProfile = async (req, res) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({ token })
            .select("-password -token -resetToken");
        return res.json(user);
        
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

       return res.json({
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            semester: user.semester,
            bio: user.bio,
            profilePicture: user.profilePicture,
            role: user.role
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetToken = resetToken;

        await user.save();

        return res.json({ message: "Reset token generated", resetToken });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try{

        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({
                message: "Reset token and new password are required"
            });
        }

        const user = await User.findOne({ resetToken });

        if (!user) {
            return res.status(404).json({ message: "Invalid reset Token" });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetToken = "",
        
        await user.save();

        return res.json({ message: "Password reset successfull" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }     
};
