import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js"; // Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
