import express, { Express, Request, Response, NextFunction } from "express";
import { Member } from "../model/memberSchema";

enum Gender {
	Male = "male",
	Female = "female",
}

enum PlayPosition {
	PointGuard = "pointGuard",
	ShootingGuard = "shootingGuard",
	SmallForward = "smallForward",
	PowerForward = "powerForward",
	Center = "center",
}

type MemberType = {
	firstName: string;
	lastName: string;
	phone: string;
	gender: Gender;
	email: string;
	dateOfYear: number;
	dateOfMonth: number;
	position: [PlayPosition];
	updatedBy: string;
};

export const createMember = async (
	req: Request<{}, MemberType, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	const memberData = req?.body as MemberType;
	const { phone } = memberData ?? {};

	const isExistedMember = await Member.findOne({ phone });
	if (isExistedMember)
		return res
			.status(409)
			.json({ error: "Member existed in database already." });

	const createMember = await Member.create(memberData);
	if (!createMember) return res.status(400).json({ error: "Bad user input." });

	return res.status(200).json({ message: "Member created successfully." });
};

export const getMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req?.params;
	if (!id)
		return res.status(404).json({ error: `Member ID - ${id} Not Found.` });

	const getMember = await Member.findById(id);
	return res.status(200).json(getMember);
};

export const getMemberList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const memberList = await Member.find();

	return res.status(200).json(memberList);
};

export const getMemberCount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const memberList = await Member.find();

	return res.status(200).json(memberList?.length).end();
};

export const updateMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req?.params;
	const memberData = req?.body as MemberType;

	if (!id)
		return res.status(404).json({ error: `Member ID - ${id} Not Found.` });

	const updateMember = await Member.findByIdAndUpdate(id, memberData);
	if (!updateMember) return res.status(403).json({ error: "Bad user input" });

	return res.status(200).json({ message: "Update member successfully." });
};
