import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

export const loginUser = async (req, res) => {
    const { email} = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user)
        {
            user = await User.create({
                email
            })
        }

        const otp = Math.floor(Math.random() * 100000);
        const verifyToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
            expiresIn: "5m"
        })

        await sendMail(email, "OTP FOR LOGIN", otp);
        
        res.json({
            message: "otp sent to your mail",
            verifyToken
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const verifyUser = async (req, res) => {
    try {
        const { otp, verifyToken } = req.body;
        const verify = jwt.verify(verifyToken, process.env.JWT_SECRET);
        if(!verify) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        if (verify.otp !== otp) {
            return res.status(400).json({ message: "User Verified" });
        }

        const token = jwt.sign({ _id: verify.user._id }, process.env.JWT_SECRET, {
            expiresIn
        })

        res.json({
            message: "User Verified",
            token
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }
 }

export const myProfile = async (req, res) => { 
    try {
        const user = await User.findById(req.user._id);

        res.json(user);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}
