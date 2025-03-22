import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"

// Add Doctor
const addDoctor = async (req, res) => {
    try {
        const { email, password, address } = req.body;
        const imageFile = req.file;

        // Check form input
        const isFormDetailsFull = Object.values(req.body).every(value => value)
        if (!isFormDetailsFull) {
            return res.json({ success: false, message: "Missing fields" })
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

        // Upload image to cloudinary and get res with a link
        const uploadedImg = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = uploadedImg.secure_url;


        const doctorData = {
            ...req.body,
            password: hashPassword,
            image: imageUrl,
            date: Date.now(),
            // In form-data, need convert an Object to String Json
            address: JSON.parse(address),
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.json({ success: true, message: "Doctor added successfully" })


    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: "Error at adminController, Add Doctor" })

    }
}


//Login Admin 
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isAuthenticated = (email === process.env.ADMIN_EMAIL
            && password === process.env.ADMIN_PASSWORD)
        if (isAuthenticated) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: "Error at adminController, Login Admin" })
    }
}

export { addDoctor, loginAdmin };