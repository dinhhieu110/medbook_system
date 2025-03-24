import doctorModel from "../models/doctorModel.js";

// Declare here because need it in both Admin and Doctor
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const doctor = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !doctor.available })
        return res.json({ success: true, message: "Changed availability successfully" })
    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: "Error at doctorController, Change availability" })
    }
}

// Get doctor list
const getAllDoctors = async (req, res) => {
    try {
        // get doctors without password
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        return res.json({ success: true, doctors })

    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: "Error at doctorController, Get all doctors" })
    }
}
export { changeAvailability, getAllDoctors }