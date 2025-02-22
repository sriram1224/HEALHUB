import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decoded.id;
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
