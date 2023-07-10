import express, { Express, Request, Response, NextFunction } from "express";
import { Team } from "../model/teamSchema";

export const getTeamList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getTeamList = await Team.find();

	if (!getTeamList) {
		return res.status(502).json({ message: "Internal Server Error" }).end();
	}
	return res.status(200).json(getTeamList).end();
};

export const getTeamCount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const getTeamList = await Team.find();

	if (!getTeamList) {
		return res.status(404).json({ message: "No List Found." }).end();
	}
	return res.status(200).json(getTeamList?.length).end();
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
			.json({ message: "name or memberCount not provieded." }).end();

	const createData = {
		name,
		memberCount,
		joinAt: joinAt ?? Date.now(),
		updatedBy: null,
	};

	const create = await Team.create(createData);

	if (!create)
		return res.status(502).json({ message: "Internal Server Error" }).end();

	return res.status(200).json({ message: "Team Created." }).end();
};

export const getTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const teamId = await req.params?.id;

	if (!teamId)
		return res.status(502).json({ error: "TeamId No Found Or Missing." }).end();

	const getTeam = await Team.findById(teamId);

	if (!getTeam)
		return res.status(404).json({ error: `Team With ID ${teamId} Found` }).end();

	return res.status(200).json(getTeam).end();
};

export const editTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const teamId = await req.params?.id;

	return res.json(teamId);
};
