import express from "express";
import upload from "../middlewares/multer.js";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
} from "../controllers/userController.js";
import { authUser } from "../middlewares/authUser.js";

// Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",

  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/my-appointments", authUser, listAppointments);

export default userRouter;
