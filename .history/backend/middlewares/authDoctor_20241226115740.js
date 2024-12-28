import jwt from "jsonwebtoken";

export const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    console.log("Received token:", dtoken);
    if (!dtoken) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }

    const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decoded);
    req.body.docId = token_decoded.id;

    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
