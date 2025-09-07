
import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  getUserProfile,
} from "../controllers/userController";
import userAuth from "../middleware/userAuth";

const userRouter: Router = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);

// Protected routes
userRouter.get("/profile", userAuth, getUserProfile);

export default userRouter;
