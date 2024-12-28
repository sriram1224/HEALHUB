import express from "express";
import { registerUser } from "../controllers/userController.js"; // Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);

export default userRouter;
