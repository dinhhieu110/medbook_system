import express from "express";
import { getUserDetails, login, register } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-profile", authUser, getUserDetails);





export default userRouter;
