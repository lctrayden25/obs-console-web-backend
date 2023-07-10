import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// import { defaultData, Person } from "./mock/mockData";
import database from "./config/Database";

import { teamRouter } from "./router/teamRouter";

dotenv.config();
database();

const app: Express = express();

const corsOptions = {
	origin: ["http://localhost:3000"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
	return res.json("Homepage");
});

app.use("/team", teamRouter);

// app.get("/team-list", (req: Request, res: Response) => {
// 	const { page, limit, team, member } = req.query as any;

// 	const startIndex = (page - 1) * limit;
// 	const endIndex = page * limit;

// 	const list = defaultData.slice(startIndex, endIndex);

// 	return res.json(list);
// });

// app.get("/team-count", (req: Request, res: Response) => {
// 	const list = defaultData.length;

// 	return res.json(list);
// });

app.listen(9000, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${9000}`);
});
