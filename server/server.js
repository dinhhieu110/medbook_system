import express from "express"
import cors from "cors"
import "dotenv/config"
import connectToDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

// App config
const app = express()
const PORT = process.env.PORT || 4000;
connectToDB();
connectCloudinary();

// Middlewares
app.use(express.json());
// Allow FE connects to BE
app.use(cors());

// API endpoints
app.use("/api/admin", adminRouter); // localhost:4000/api/admin
app.use("/api/doctor", doctorRouter); // localhost:4000/api/doctor
app.use("/api/user", userRouter); // localhost:4000/api/user



app.get('/', (req, res) => {
    res.send("API works!")
})

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})