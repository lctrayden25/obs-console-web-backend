import express, { Express } from "express";
const router = express.Router();

import { login } from "../controller/authController";

router.post("/login", login);

export { router as authRouter };
