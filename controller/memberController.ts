import express, { Express, Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { Member } from "../model/memberSchema";
import { pagination } from "../helper";
import { MemberType } from "../type/member";

export const getMemberList = async (
	req: Request<{}, {}, {}, any>,
	res: Response,
	next: NextFunction
) => {
	const { page, limit, name } = req?.query;

	const isFullList = page === undefined || limit === undefined;

	let result = [] as any;
	if (name === "" || isFullList) {
		result = await Member.find();
	} else {
		if (name) {
			result = await Member.find({
				$or: [
					{ lastName: { $regex: name ?? "", $options: "i" } },
					{ firstName: { $regex: name ?? "", $options: "i" } },
				],
			});
		}
	}

	const paginatedResult = pagination(page, limit, result);

	return res.status(200).json({
		list: isFullList ? result : paginatedResult,
		count: result?.length,
	});
};

export const getMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req?.params;
	if (!id)
		return res.status(404).json({ error: `Member ID - ${id} Not Found.` });

	const getMember = await Member.findById(id).populate("team");

	return res.status(200).json(getMember);
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
			.json({ error: "Member Existed In Collection Already." });

	const createMember = await Member.create(memberData);
	if (!createMember) return res.status(400).json({ error: "Bad User Input." });

	return res.status(200).json({ message: "Member Created Successfully." });
};

export const updateMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req?.params;
	const memberData = req?.body as MemberType;

	console.log(memberData)

	if (!id)
		return res.status(404).json({ error: `Member ID - ${id} Not Found.` });

	const updateMember = await Member.findByIdAndUpdate(id, memberData);
	if (!updateMember) return res.status(403).json({ error: "Bad User Input" });

	return res.status(200).json({ message: "Update member successfully." });
};

export const deleteMember = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req?.params;

	if (!id)
		return res.status(404).json({ error: `Member ID - ${id} Not Found.` });

	const deleteMember = await Member.findByIdAndDelete({ _id: id });
	if (!deleteMember)
		return res.status(500).json({ error: "Internal Server Error." });

	return res.status(200).json({ message: "Delete Member Successfully." });
};
