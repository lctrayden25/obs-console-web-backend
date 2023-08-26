import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Team } from "../model/teamSchema";

type ListTableQuery = {
	page: number;
	limit: number;
	team: string;
};

export const getTeamList = async (
	req: Request<{}, {}, {}, ListTableQuery>,
	res: Response,
	next: NextFunction
) => {
	const { page, limit, team } = req?.query;
	const getTeamList = await Team.find({
		name: { $regex: team ?? "", $options: "i" },
	});

	return res
		.status(200)
		.json({ list: getTeamList, count: getTeamList?.length })
		.end();
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
			.json({ message: "Field [name] Or [memberCount] Not Provieded." })
			.end();

	const createData = {
		name,
		memberCount,
		joinAt: joinAt ?? Date.now(),
		updatedBy: null,
	};

	const createTeam = await Team.create(createData);

	if (!createTeam)
		return res.status(502).json({ message: "Internal Server Error" }).end();

	return res.status(200).json({ message: "Team Created." }).end();
};

export const getTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const teamId = req.params?.id;

	if (!teamId)
		return res
			.status(502)
			.json({ error: "Team ID No Found Or Missing." })
			.end();

	const getTeam = await Team.findById(teamId);

	if (!getTeam)
		return res
			.status(404)
			.json({ error: `Team ID - ${teamId} Not Found` })
			.end();

	return res.status(200).json(getTeam).end();
};

export const updateTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const { name, memberCount } = req.body;

	if (!id)
		return res
			.status(404)
			.json({ error: "Team ID No Found Or Missing." })
			.end();

	const updateTeam = await Team.findByIdAndUpdate(id, { name, memberCount });
	console.log(updateTeam);

	if (!updateTeam)
		return res.status(500).json({ error: "Internal Server Error" });

	return res.status(200).json({ message: "Update Team Data Successfully." });
};

export const deleteTeam = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	if (!id) return res.status(409).json({ error: `Team ID - ${id} Not Found` });

	const deleteTeam = await Team.findByIdAndDelete({ _id: id });

	if (!deleteTeam)
		return res.status(500).json({ error: "Internal Server Error." });

	return res.status(200).json({ message: "Delete Team Successfully." });
};
