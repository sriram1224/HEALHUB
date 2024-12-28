import doctorModel from "../models/doctorModel.js";
const doctorAvailability = async (req, res) => {
  try {
    const { doctId } = req.body;
    const doctorData = await doctorModel.findById(doctId);
    await doctorModel.findByIdAndUpdate();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { doctorAvailability };