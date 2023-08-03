import express, { Express } from "express";
const router = express.Router();

import { createAdmin, createDefaultAdmin } from "../controller/adminController";

router.post('/create-admin', createAdmin)

router.post('/create-default-admin', createDefaultAdmin)

export { router as adminRouter }