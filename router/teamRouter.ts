import express, { Express, NextFunction, Request, Response } from "express";
const app = express();
const router = express.Router();

import {
	getTeamList,
	createTeam,
	getTeam,
	updateTeam,
	deleteTeam,
	exportTeamlist,
} from "../controller/teamController";

router.get("/get-team-list", getTeamList);

router.post("/create-team", createTeam);

router.get("/get-team/:id", getTeam);

router.put("/update-team/:id", updateTeam);

router.delete("/delete-team/:id", deleteTeam);

router.get("/export-team-list-excel", exportTeamlist);

export { router as teamRouter };
