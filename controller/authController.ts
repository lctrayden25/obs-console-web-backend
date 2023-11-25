import express, { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Admin } from "../model/adminSchema";
import cookieParser from "cookie-parser";
import jwt, { Secret, JwtPayload, Jwt } from "jsonwebtoken";
import randToken from "rand-token";
import dotenv from "dotenv";
dotenv.config();

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
		return res.status(500).json({ message: "Password is not correct." });
	}

	const { _id, role, name } = getAdmin ?? {};

	const token = jwt.sign(
		{ data: { _id, role, name } },
		process.env.PRIVATE_KEY as string,
		{ expiresIn: "2 days" }
	);

	if (!token) {
		return res.status(500).json({ message: "Token unavailable." }).end();
	}

	res.cookie("obs_token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
	});
	res
		.status(200)
		.json({ message: "Login successfully", isLogin: true, token: token });
	res.end();
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.clearCookie("obs_token");
	res
		.status(200)
		.json({ message: "The user has been logged out", isLgoin: false });

	res.end();
};

export const authAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { obs_token } = req.cookies;

	if (!obs_token) {
		return res
			.status(502)
			.json({ message: "Admin authenication failed." })
			.end();
	}

	const auth = jwt.verify(obs_token, process.env.PRIVATE_KEY as string);

	return res.status(200).json({ auth }).end();
};

export const updateAdminPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.json("Update Password");
};
