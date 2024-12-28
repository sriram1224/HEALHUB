import validator from "validator";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
