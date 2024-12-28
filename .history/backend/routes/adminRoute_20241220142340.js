import express from "express";
import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { doctorAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctor", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, doctorAvailability);
adminRouter.get("/appointment-admin", authAdmin, appointmentsAdmin);
adminRouter.post("/");
export default adminRouter;
