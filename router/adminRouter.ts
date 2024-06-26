import express, { Express } from "express";
const router = express.Router();

import { createAdmin, createDefaultAdmin } from "../controller/adminController";
import { verifyAdmin } from "../middleware/verifyAdmin";

router.post("/create-admin", verifyAdmin, createAdmin);

router.post("/create-default-admin", createDefaultAdmin);

export { router as adminRouter };
