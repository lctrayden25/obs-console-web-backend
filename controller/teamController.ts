import express, { Express, Request, Response, NextFunction } from "express";
import { Team } from "../model/teamSchema";
import { pagination } from "../helper";
const CsvParser = require("json2csv").Parser;

export type ListTableQuery = {
	page: number;
	limit: number;
	team: string;
	joinAtStart: string | null;
	joinAtEnd: string | null;
};

export const getTeamList = async (
	req: Request<any, any, any, ListTableQuery | any>,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { page, limit, team, joinAtStart, joinAtEnd } = req?.query;

	const isFullList = page === undefined || limit === undefined;

	let result: any = [];
	if (
		(team === "" && joinAtStart === "null" && joinAtEnd === "null") ||
		isFullList
	) {
		result = await Team.find();
	} else {
		if (team !== "") {
			result = await Team.find({ name: { $regex: team ?? "", $options: "i" } });
		}

		if (joinAtStart !== "null" && joinAtEnd !== "null") {
			result = await Team.find({
				joinAt: { $gte: joinAtStart, $lte: joinAtEnd },
			});
		}
	}

	const paginatedResult = pagination(page, limit, result);

	return res
		.status(200)
		.json({
			list: isFullList ? result : paginatedResult,
			count: result?.length,
		})
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
			.json({ message: "Field [name] Or [memberCount] Not Provided." })
			.end();

	const createData = {
		name,
		memberCount,
		joinAt: joinAt ?? null,
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
	const { name, memberCount, joinAt } = req.body;

	if (!id)
		return res
			.status(404)
			.json({ error: "Team ID No Found Or Missing." })
			.end();

	const updateTeam = await Team.findByIdAndUpdate(id, {
		name,
		memberCount,
		joinAt,
	});

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

export const exportTeamList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		return res.json("exporting")
	} catch (error) {
		if (error instanceof Error) {
			console.log("Error");
			throw new Error(error.message);
		}
	}
};
