import express from "express";
const router = express.Router();

import {
	createMember,
	getMemberList,
	getMember,
	updateMember,
	getMemberCount,
	deleteMember,
} from "../controller/memberController";

router.post("/create-member", createMember);

router.get("/get-member/:id", getMember);

router.post("/update-member/:id", updateMember);

router.get("/get-member-list", getMemberList);

router.get("/get-member-count", getMemberCount);

router.delete("/delete-member/:id", deleteMember);

export { router as memberRouter };
