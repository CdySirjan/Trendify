// src/routes/userRoute.ts
import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
} from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);

export default userRouter;
