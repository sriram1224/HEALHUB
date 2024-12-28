import e from "express";
import doctorModel from "../models/doctorModel.js";

export const doctorAvailability = async (req, res) => {
  const { docId } = req.body;

  try {
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({ success: true, message: "Doctor availability updated", doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
