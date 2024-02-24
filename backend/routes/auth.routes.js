import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Define your routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Export each route individually
export const signupRoute = router.post("/signup", signup);
export const loginRoute = router.post("/login", login);
export const logoutRoute = router.post("/logout", logout);
