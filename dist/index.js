"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mockData_1 = require("./mock/mockData");
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    return res.json("home");
});
app.get("/team-list", (req, res) => {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const list = mockData_1.defaultData.slice(startIndex, endIndex);
    return res.json(list);
});
app.get("/team-count", (req, res) => {
    const list = mockData_1.defaultData.length;
    return res.json(list);
});
app.listen(9000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${9000}`);
});
