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
        res.status(500).json({ message: "Server Error" });
    }
}