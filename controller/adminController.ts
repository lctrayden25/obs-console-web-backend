import express, { Express, Request, Response, NextFunction } from "express";
import { Admin } from "../model/adminSchema";
import bcrypt from "bcrypt";

export const createDefaultAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const email = "obsadmin@gmail.com";
	const password = "obsadmin123";
	const role = "admin";

	const hashPassword = await bcrypt.hash(password, 10);
	const adminData = {
		name: email,
		email,
		password: hashPassword,
		role,
	};

	if (!hashPassword) {
		return res.status(502).json({ message: "Cannot Hash Password." });
	}

	const createAdmin = await Admin.create(adminData);

	if (!createAdmin) {
		return res.status(502).json({ message: "Create Admin Failure." });
	}

	return res.status(200).json({ message: "Admin Created." });
};

export const createAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
