import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
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

    const userData = { name, email, password: hashedPassword };
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
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Check required fields
    if (!userId || !name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // Safely parse the address field
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address format" });
    }

    // Update user profile
    const updateData = {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    };

    // Check and handle image upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image", // Corrected typo: resourse_type → resource_type
      });

      updateData.image = imageUpload.secure_url; // Add image to the update data
    }

    // Update the user in MongoDB
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
