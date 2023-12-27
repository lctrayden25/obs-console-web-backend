import express, { Express } from "express";
const router = express.Router();

import {
	login,
	logout,
	authAdmin,
	updateAdminPassword,
} from "../controller/authController";
import { verifyAdmin } from "../middleware/verifyAdmin";

router.post("/login", login);

router.get("/logout", logout);

router.post("/me", authAdmin);

router.post("/update-password", verifyAdmin, updateAdminPassword);

export { router as authRouter };
