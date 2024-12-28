import multer from "multer";
import fs from "fs";
import path from "path";

// Get the current directory path (equivalent of __dirname in ES modules)
const uploadDir = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "uploads"
);

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

// Create upload middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export default upload;
