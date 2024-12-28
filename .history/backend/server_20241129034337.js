import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import doctorRouter from "./routes/doctorRoute.js";

// Connect to MongoDB
connectCloudinary();
connectDB()
  .then(() => {
    console.log("MongoDB connection established");

    // App config
    const app = express();
    const port = process.env.PORT || 4000;

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    // API endpoints
    app.use("/api/doctors", doctorRouter);
    app.use("/api/admin", adminRouter);

    // Routes
    app.get("/", (req, res) => {
      res.send("API is working");
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
