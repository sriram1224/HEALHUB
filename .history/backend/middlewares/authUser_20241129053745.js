import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);
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
