import e from "express";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
export const doctorAvailability = async (req, res) => {
  const { docId } = req.body;
  console.log(docId);

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
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find doctor
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        available: doctor.available,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// API to get doctor appointment for doctor panel

export const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId: docId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to mark appointment as done
export const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentId && appointmentData.docId == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment marked as done" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentId && appointmentData.docId == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment marked as done" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get dashboard data for doctor panel
export const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId: docId });
    let earning = 0;
    appointments.map((appointment) => {
      if (appointment.isCompleted || appointment.payment) {
        earning += appointment.amount;
      }
    });
    let patients = [];
    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });
    return res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
