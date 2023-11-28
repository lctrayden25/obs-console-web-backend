import express from "express";
const router = express.Router();

import {
	createMember,
	getMemberList,
	getMember,
	updateMember,
	// getMemberCount,
	deleteMember,
} from "../controller/memberController";
import { verifyAdmin } from "../middleware/verifyAdmin";

router.post("/create-member", verifyAdmin, createMember);

router.get("/get-member/:id",verifyAdmin, getMember);

router.post("/update-member/:id", verifyAdmin, updateMember);

router.get("/get-member-list", verifyAdmin,  getMemberList);

// router.get("/get-member-count", getMemberCount);

router.delete("/delete-member/:id", verifyAdmin, deleteMember);

export { router as memberRouter };
