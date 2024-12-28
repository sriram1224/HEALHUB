const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.create({ name, email, password });
        res.status(201).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
