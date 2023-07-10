import mongoose, { Mongoose } from "mongoose";
import { Response } from "express";

const DB_CONNECTION = async () => {
	try {
		const db = await mongoose.connect(process.env.DB_CONNECTION as string, {
			dbName: process.env.DB_NAME,
		});
		mongoose.set("debug", true);
		if (db) {
			console.log(`Database Connected - DATABASE: ${process.env.DB_NAME}`);
		}
	} catch (error) {
		console.log(error);
		return (res: Response) => res.status(500).json({ error: error });
	}
};

export default DB_CONNECTION;
