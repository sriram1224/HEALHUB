import express from "express";
import upload 
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { authUser } from "../middlewares/authUser.js";
// Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", authUser, Upload.single("image"), updateProfile);
export default userRouter;
