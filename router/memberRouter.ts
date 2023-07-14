import express from "express";
const router = express.Router();

import { createMember, getMemberList, getMemberCount } from "../controller/memberController";

router.post('/create-member', createMember);

router.get("/get-member-list", getMemberList);

router.get("/get-member-count", getMemberCount)

export { router as memberRouter };