import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import e from "express";
import jwt from "jsonwebtoken";

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
export { addDoctor, loginAdmin, allDoctors };
