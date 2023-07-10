import express, { Express, Request, Response, NextFunction } from "express";
import { Team } from "../model/teamSchema";

export const getTeamList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getTeamList = await Team.find();

	if (!getTeamList) {
		return res.status(502).json({ message: "Internal Server Error" });
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
		return res.status(404).json({ message: "No List Found." });
	}
	return res.status(200).json(getTeamList?.length);
};

export const createTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, memberCount, joinAt } = await req.body;

	if (!name || !memberCount)
		return res
			.status(502)
			.json({ message: "name or memberCount not provieded." });

	const createData = {
		name,
		memberCount,
		joinAt: joinAt ?? Date.now(),
		updatedBy: null,
	};

	const create = await Team.create(createData);

	if (!create)
		return res.status(502).json({ message: "Internal Server Error" });

	return res.status(200).json({ message: "Team Created." });
};

export const getTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const teamId = await req.params?.id;

	if (!teamId)
		return res.status(502).json({ error: "TeamId No Found Or Missing." });

	const getTeam = await Team.findById(teamId);

	if (!getTeam)
		return res.status(404).json({ error: `Team With ID ${teamId} Found` });

	return res.status(200).json(getTeam);
};

export const editTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const teamId = await req.params?.id;

	return res.json(teamId);
};
