import express from "express";
import { getUserDetails, login, register, updateUserDetails, bookAppointment, getAppointmentList, cancelAppointment, payAppointment, checkoutAllAppointments } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-profile", authUser, getUserDetails);
userRouter.patch("/update-profile", upload.single('image'), authUser, updateUserDetails)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, getAppointmentList)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/pay-appointment", authUser, payAppointment)
userRouter.post("/checkout-all", authUser, checkoutAllAppointments)








export default userRouter;
