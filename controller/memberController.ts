import express, { Express, Request, Response, NextFunction } from "express";
import { Member } from "../model/memberSchema";

export const createMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const data = {
		firstName: "Rayden",
		lastName: "Li",
		phone: "55654453",
		gender: "Male",
		email: "rayden@gmail.com",
		dateOfYear: 1997,
		dateOfMonth: 9,
		position: ["guard"],
		updatedBy: "rayden",
	};

	const create = await Member.create(data);

	return res.status(200).json("create").end();
};

export const getMemberList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const memberList = await Member.find();

	return res.status(200).json(memberList).end()
};

export const getMemberCount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const memberList = await Member.find();

	return res.status(200).json(memberList?.length).end()
}

