import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    // validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    //validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,

      password: hashedPassword,
    };
    const newUser = await userModel.create(userData);
    const user = await newUser.save();
    // _id
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get user profile data
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Api to update user profile
export const updateProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!userId || !name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // Clean up the address field
    const cleanedAddress = address
      .replace(/\\r\\n/g, "")
      .replace(/\\/g, "")
      .replace(/"{/g, "{")
      .replace(/}"/g, "}")
      .replace(/,\s*$/, ""); // Remove trailing comma

    const parsedAddress = JSON.parse(cleanedAddress);

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob: new Date(dob),
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    console.log(userId);
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Ensure the doctor has a valid available slots record
    let slots_booked = docData.slots_booked || {};

    // Check if the slot for the given date is already booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Retrieve user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Prepare appointment data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      slotDate: new Date(slotDate), // Ensure slotDate is a Date object
      slotTime,
      date: Date.now(),
      amount: docData.fees, // Assuming 'fees' is part of doctor data
      cancelled: false,
      payment: false,
      isCompleted: false,
    };

    // Create the new appointment
    const newAppointment = await appointmentModel.create(appointmentData);
    await newAppointment.save();

    // Update the doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get user appointments for frontend my appointments page
export export const cancelAppointment = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { appointmentId, userId } = req.body;

    // Step 1: Validate the appointment
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }

    // Step 2: Mark the appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Step 3: Update the doctor's slots_booked
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    let slots_booked = doctorData.slots_booked || {};
    const slotDateKey = slotDate.toISOString().split("T")[0]; // Ensure correct date key

    if (slots_booked[slotDateKey]) {
      // Remove the slot if it exists
      slots_booked[slotDateKey] = slots_booked[slotDateKey].filter(
        (slot) => slot !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

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
