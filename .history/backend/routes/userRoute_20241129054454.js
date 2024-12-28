import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js"; // Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authgetProfile);

export default userRouter;
