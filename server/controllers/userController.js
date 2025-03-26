import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import { now } from "mongoose";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe"

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    // Check email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // Check whether password strong
    if (password.length < 8) {
      return res.json({ success: false, message: "Weak password" });
    }

    // Hashing password // 5-->15 --> stronger, longer to convert back
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      ...req.body,
      password: hashPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    // Generate a token for new user to login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "The user does not exist" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "The user does not exist" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Failed missing" });
    }
    const formData = {
      ...req.body,
      address: typeof address === "string" ? JSON.parse(address) : address,
    };
    const updatedUser = await userModel.findByIdAndUpdate(userId, formData, {
      new: true,
    });

    if (imageFile) {
      const uploadedImg = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = uploadedImg.secure_url;
      await userModel.findByIdAndUpdate(
        userId,
        { image: imageURL },
        { new: true }
      );
    }
    return res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime } = req.body;

    const doctorData = await doctorModel.findById(doctorId).select("-password");

    if (!doctorData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }

    let slots_booked = doctorData.slots_booked;
    // Check whether the date slot available
    if (slots_booked[slotDate]) {
      // Check whether the time slot available
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "This slot was booked" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    // Do not need previous slots of that doctor in new appointment
    delete doctorData.slots_booked;

    const appointmentData = {
      ...req.body,
      doctorData,
      userData,
      amount: doctorData.fees,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Add previous slots of that doctor back with new slots
    await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });
    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const getAppointmentList = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId })
    return res.json({ success: true, appointments });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // When appointment cancelled, slot time in Doctoc slots_booked will be available again
    const { doctorId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(doctorId)
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(item => item !== slotTime);
    await doctorModel.findByIdAndUpdate(doctorId, { slots_booked })
    return res.json({ success: true, message: "Appointment Cancelled" });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
}

const payAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)
    const item = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: appointmentData.doctorData.name
        },
        unit_amount: appointmentData.amount * 100
      },
      quantity: 1
    }
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.create({
      // type: credit card
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [item],
      success_url: `${process.env.CLIENT_URL}/my-appointments`,
      cancel_url: `${process.env.CLIENT_URL}/my-appointments`,
    })

    await appointmentModel.findByIdAndUpdate(appointmentId, { onlinePayment: true })

    return res.json({ success: true, url: session.url })
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
}

export { login, register, getUserDetails, updateUserDetails, bookAppointment, getAppointmentList, cancelAppointment, payAppointment };
