import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decoded._id; // Ensure _id is used
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Not Authorised" });
  }
};
