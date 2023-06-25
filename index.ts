import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { defaultData, Person } from "./mock/mockData";

dotenv.config();

const app: Express = express();

const corsOptions = {
	origin: ["http://localhost:3000"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
	return res.json("home");
});

app.get("/team-list", (req: Request, res: Response) => {
	const { page, limit } = req.query as any;

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const list = defaultData.slice(startIndex, endIndex);

	return res.json(list);
});

app.get("/team-count", (req: Request, res: Response) => {
	const list = defaultData.length;

	return res.json(list);
});

app.listen(9000, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${9000}`);
});
