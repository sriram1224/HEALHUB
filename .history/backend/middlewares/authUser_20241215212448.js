import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request object
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
