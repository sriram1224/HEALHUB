import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.use;
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default authAdmin;
