import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Check if all fields are provided

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !available ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // validating password strong password
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ success: false, message: "Password is not strong enough" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path);
    const imageUrl = result.secure_url;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      date: Date.now(),
    });

    // Save doctor to database
    await newDoctor.save();

    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//API FOR THE ADMIN LOGIN

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const Appointmentcancel = async (req, res) => {
  console.log("Request Body:", req.body); // Log request body for debugging

  try {
    const { appointmentId } = req.body;

    // Step 1: Validate the appointment
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    // Log appointment data

    // Step 2: Mark the appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Step 3: Update the doctor's slots_booked
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    // Log doctor data

    let slots_booked = doctorData.slots_booked || {};
    const slotDateKey = slotDate.toISOString().split("T")[0]; // Format date as string for key

    // Log slots for that date

    if (slots_booked[slotDateKey]) {
      // Log current slots for the date

      // Remove the slot if it exists
      slots_booked[slotDateKey] = slots_booked[slotDateKey].filter(
        (slot) => slot !== slotTime
      );

      // Log updated slots
      console.log("Updated Slots on the Date:", slots_booked[slotDateKey]);

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    // Step 4: Send success response
    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// api to get Dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const user = await userModel.find({});
    const appointments = await appointmentModel.find({});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { addDoctor, loginAdmin, allDoctors };
