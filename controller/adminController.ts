import express, { Express, Request, Response, NextFunction } from "express";
import { Admin } from "../model/adminSchema";
import bcrypt from "bcrypt";

export const createAdmin = async (req: Request, res: Response) => {
	const email = "obsadmin@gmail.com";
	console.log(email);

	return res.json(email);
	// const data = {
	//     email,
	//     password,
	//     role
	// }
};
