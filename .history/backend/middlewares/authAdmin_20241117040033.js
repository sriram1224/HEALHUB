import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = (req, res) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default authAdmin;
