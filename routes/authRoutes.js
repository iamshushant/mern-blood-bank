import express from "express";
import {
  currentUserController,
  loginController,
  registerController,
} from "../controller/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/current-user", requireSignIn, currentUserController);

export default router;
