import express, { Express, Request, Response, NextFunction } from "express";
import { Team } from "../model/teamSchema";

export const getTeamList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getTeamList = await Team.find();

	if (!getTeamList) {
		return res.status(502).json({ error: "Internal Server Error" });
	}
	return res.status(200).json(getTeamList);
};

export const getTeamCount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getTeamList = await Team.find();

	if (!getTeamList) {
		return res.status(404).json({ error: "No List Found." });
	}
	return res.status(200).json(getTeamList?.length);
};

export const createTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, memberCount } = await req.body;

	return res.json("create team");
};
