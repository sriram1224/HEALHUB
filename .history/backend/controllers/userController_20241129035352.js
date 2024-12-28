const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
