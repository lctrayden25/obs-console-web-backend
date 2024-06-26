import express, { Express, NextFunction, Request, Response } from "express";
const app = express();
const router = express.Router();

import {
	getTeamList,
	createTeam,
	getTeam,
	updateTeam,
	deleteTeam,
	exportTeamList,
} from "../controller/teamController";
import { verifyAdmin } from "../middleware/verifyAdmin";

router.get("/get-team-list", verifyAdmin, getTeamList);

router.post("/create-team", verifyAdmin, createTeam);

router.get("/get-team/:id", verifyAdmin, getTeam);

router.put("/update-team/:id",verifyAdmin,  updateTeam);

router.delete("/delete-team/:id",verifyAdmin, deleteTeam);

router.get("/export-team-list", exportTeamList)


export { router as teamRouter };
