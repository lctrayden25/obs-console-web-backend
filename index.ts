import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./config/Database";
import cookieParser from "cookie-parser";

import { memberRouter } from "./router/memberRouter";
import { adminRouter } from "./router/adminRouter";
import { authRouter } from "./router/authRouter";
import { teamRouter } from "./router/teamRouter";

dotenv.config();
const app: Express = express();
const corsOptions = {
	origin: [
		process.env.CLIENT_ORIGIN_URL as string,
		process.env.LOCAL_API_FIRST_TEST_ENDPOINT as string,
		process.env.LOCAL_API_SECOND_TEST_ENDPOINT as string,
	],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization", "Content-Disposition"],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
	return res.json("Initial Page");
});

app.use("/team", teamRouter);
app.use("/member", memberRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 9002;

app.listen(PORT, () => {
	database();
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
