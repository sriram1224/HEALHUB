const doctorAvailability = async (req, res) => {
  try {
    const { doctId } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { doctorAvailability };
