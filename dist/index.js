"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const Database_1 = __importDefault(require("./config/Database"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const memberRouter_1 = require("./router/memberRouter");
const adminRouter_1 = require("./router/adminRouter");
const authRouter_1 = require("./router/authRouter");
const teamRouter_1 = require("./router/teamRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        process.env.CLIENT_ORIGIN_URL,
        process.env.LOCAL_API_FIRST_TEST_ENDPOINT,
        process.env.LOCAL_API_SECOND_TEST_ENDPOINT,
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Content-Disposition"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    return res.json("Initial Page");
});
app.use("/team", teamRouter_1.teamRouter);
app.use("/member", memberRouter_1.memberRouter);
app.use("/admin", adminRouter_1.adminRouter);
app.use("/auth", authRouter_1.authRouter);
const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
    (0, Database_1.default)();
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
