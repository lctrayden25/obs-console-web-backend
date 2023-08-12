import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./config/Database";
import cookieParser from "cookie-parser";

import { teamRouter } from "./router/teamRouter";
import { memberRouter } from "./router/memberRouter";
import { adminRouter } from "./router/adminRouter";
import { authRouter } from "./router/authRouter";

dotenv.config();
const app: Express = express();

const corsOptions = {
	origin: ["http://localhost:3000", "http://localhost:3001"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization", ],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
	return res.json("Homepage");
});

app.use("/team", teamRouter);
app.use("/member", memberRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

const serverConnect = () => {
	try {
		app.listen(9000, () => {
			database();
			console.log(`⚡️[server]: Server is running at http://localhost:${9000}`);
		});
	} catch (error) {
		console.log(error);
	}
};

serverConnect();
