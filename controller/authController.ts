import express, { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Admin } from "../model/adminSchema";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

interface LoginQuery {
	email: string;
	password: string;
}

export const login = async (
	req: Request<{}, {}, LoginQuery, {}>,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(404).json({ message: "Admin not found." });

	const getAdmin = await Admin.findOne({ email });

	const { password: dbPassword } = getAdmin ?? {};

	const comparePwd = await bcrypt.compare(password, dbPassword as string);

	if (!comparePwd) {
		return res.status(500).json({ message: "Password not correct." });
	}
};
