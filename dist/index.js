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
const teamRouter_1 = require("./router/teamRouter");
const memberRouter_1 = require("./router/memberRouter");
const adminRouter_1 = require("./router/adminRouter");
const authRouter_1 = require("./router/authRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        process.env.LOCAL_API_ENDPOINT,
        process.env.LOCAL_SECOND_API_ENDPOINT,
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Content-Disposition"],
    credentials: true,
};
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    return res.json("This is homepage");
});
app.use("/team", teamRouter_1.teamRouter);
app.use("/member", memberRouter_1.memberRouter);
app.use("/admin", adminRouter_1.adminRouter);
app.use("/auth", authRouter_1.authRouter);
const PORT = process.env.PORT || 9002;
const serverConnect = () => {
    try {
        app.listen(PORT, () => {
            (0, Database_1.default)();
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
serverConnect();
//# sourceMappingURL=index.js.map