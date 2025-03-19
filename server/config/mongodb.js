import mongoose from "mongoose";

const connectToDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connect to DB successfully!")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/medical_system`);
}

export default connectToDB