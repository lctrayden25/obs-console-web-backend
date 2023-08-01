import express, { Express } from "express";
const router = express.Router();

import { createAdmin } from "../controller/adminController";

router.post('/create-admin', createAdmin)

export { router as adminRouter }