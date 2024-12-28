import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorProfile,
  doctorUpdateProfile,
  loginDoctor,
} from "../controllers/doctorController.js";
import { authDoctor } from "../middlewares/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.post("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, doctorUpdateProfile);
export default doctorRouter;