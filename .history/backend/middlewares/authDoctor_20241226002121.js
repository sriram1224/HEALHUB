import jwt from "jsonwebtoken";

export const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.params; // Use params to get docId
    console.log("Received docId:", docId); // For debugging

    // Validate docId
    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is missing" });
    }

    const appointments = await appointmentModel.find({ doctorId: docId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
