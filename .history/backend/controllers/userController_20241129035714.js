import validator from "validator";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
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
    // hash password
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
