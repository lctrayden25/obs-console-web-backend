import express, { Express, NextFunction, Request, Response } from "express";
const app = express();
const router = express.Router();

import {
	getTeamList,
	createTeam,
	getTeam,
	updateTeam,
	deleteTeam,
} from "../controller/teamController";
import { tokenToString } from "typescript";

router.get("/get-team-list", getTeamList);

router.get("/test", tokenToString)

router.post("/create-team", createTeam);

router.get("/get-team/:id", getTeam);

router.put("/update-team/:id", updateTeam);

router.delete("/delete-team/:id", deleteTeam);


export { router as teamRouter };
