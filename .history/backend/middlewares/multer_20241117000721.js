import multer from "multer";
import fs from "fs";
import path from "path";

// Set up the directory path for file uploads
const uploadDir = path.join(__dirname, "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // The directory where the files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Ensure a unique filename
  },
});

const upload = multer({ storage });

export default upload;
