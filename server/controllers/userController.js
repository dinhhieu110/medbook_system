import userModel from "../models/userModel.js";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" })
        }
        // Check email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" })
        }

        // Check whether password strong
        if (password.length < 8) {
            return res.json({ success: false, message: "Weak password" })
        }

        // Hashing password // 5-->15 --> stronger, longer to convert back
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            ...req.body,
            password: hashPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        // Generate a token for new user to login
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.json({ success: true, token })

    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "The user does not exist" })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: error.message })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId)
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "The user does not exist" })
        }
        return res.json({ success: true, user })

    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export { login, register, getUserDetails }