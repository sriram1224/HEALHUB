import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decoded._id;
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
