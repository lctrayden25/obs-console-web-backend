import express, { Express } from "express";
const router = express.Router();

import {
	login,
	logout,
	authAdmin,
	updateAdminPassword,
} from "../controller/authController";

router.post("/login", login);

router.get("/logout", logout);

router.post("/me", authAdmin);

router.post("/update-password", updateAdminPassword);

export { router as authRouter };
