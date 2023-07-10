"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { defaultData, Person } from "./mock/mockData";
const Database_1 = __importDefault(require("./config/Database"));
const teamRouter_1 = require("./router/teamRouter");
dotenv_1.default.config();
(0, Database_1.default)();
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    return res.json("Homepage");
});
app.use("/team", teamRouter_1.teamRouter);
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
