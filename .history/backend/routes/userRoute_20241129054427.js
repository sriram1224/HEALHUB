import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js"; // Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", getProfile);

export default userRouter;
