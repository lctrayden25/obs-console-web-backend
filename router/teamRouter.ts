import express, { Express, NextFunction, Request, Response } from "express";
const router = express.Router();

import {
	getTeamList,
	getTeamCount,
	createTeam,
	getTeam,
	updateTeam,
} from "../controller/teamController";

router.get("/get-team-list", getTeamList);

router.get("/get-team-count", getTeamCount);

router.post("/create-team", createTeam);

router.get("/get-team/:id", getTeam);

router.put("/update-team/:id", updateTeam);

export { router as teamRouter };
