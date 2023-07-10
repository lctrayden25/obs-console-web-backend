import express, { Express, Request, Response } from "express";
const router = express.Router();

import { getTeamList, getTeamCount, createTeam } from "../controller/teamController";

router.get("/get-team-list", getTeamList);

router.get("/get-team-count", getTeamCount);

router.post("/create-team", createTeam);

export { router as teamRouter };
