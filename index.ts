import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./config/Database";
import cookieParser from "cookie-parser";
import path from "path"

import { teamRouter } from "./router/teamRouter";
import { memberRouter } from "./router/memberRouter";
import { adminRouter } from "./router/adminRouter";
import { authRouter } from "./router/authRouter";

dotenv.config();
const app: Express = express();

const corsOptions = {
	origin: [
		process.env.LOCAL_API_ENDPOINT as string,
		process.env.LOCAL_SECOND_API_ENDPOINT as string,
	],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization", "Content-Disposition"],
	credentials: true,
};

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get("/", (req: Request, res: Response) => {
	return res.json("Homepage");
});

app.use("/team", teamRouter);
app.use("/member", memberRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 9002;
const serverConnect = () => {
	try {
		app.listen(PORT, () => {
			database();
			console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

serverConnect();
