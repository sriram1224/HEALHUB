import jwt from "jsonwebtoken";

export const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.userId = token_decoded._id;
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
