import express, { Express, Request, Response, NextFunction } from "express";
import { Team } from "../model/teamSchema";

type ListTableQuery = {
	page: number;
	limit: number;
	member: string;
	team: string;
};

export const getTeamList = async (
	req: Request<{}, {}, {}, ListTableQuery>,
	res: Response,
	next: NextFunction
) => {
	const { page, limit, member, team } = req?.query;

	const getTeamList = await Team.find({
		name: { $regex: team, $options: "i" },
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
			.json({ message: "name or memberCount not provieded." })
			.end();

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
	const teamId = req.params?.id;

	if (!teamId)
		return res.status(502).json({ error: "TeamId No Found Or Missing." }).end();

	const getTeam = await Team.findById(teamId);

	if (!getTeam)
		return res
			.status(404)
			.json({ error: `Team With ID ${teamId} Not Found` })
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
		return res.status(404).json({ error: "TeamId No Found Or Missing." }).end();

	const updateTeam = await Team.findByIdAndUpdate(id, { name, memberCount });

	if (!updateTeam)
		return res.status(500).json({ error: "Internal Server Error" });

	return res
		.status(200)
		.json({ message: "Update the team data successfully." });
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

	return res.status(200).json({ message: "Delete team successfully." });
};
