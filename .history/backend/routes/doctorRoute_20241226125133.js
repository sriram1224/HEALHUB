import express from "express";
import {
  appointmentsDoctor,
  doctorList,
  loginDoctor,
} from "../controllers/doctorController.js";
import { authDoctor } from "../middlewares/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/");
export default doctorRouter;
