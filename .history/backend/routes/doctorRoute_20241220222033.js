import express from "express";
import { doctorList, loginDoctor } from "../controllers/doctorController.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.get("/doctor-login", loginDoctor);
export default doctorRouter;