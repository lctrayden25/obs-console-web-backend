"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeam = exports.getTeamCount = exports.getTeamList = void 0;
const teamSchema_1 = require("../model/teamSchema");
const getTeamList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getTeamList = yield teamSchema_1.Team.find();
    if (!getTeamList) {
        return res.status(502).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(getTeamList);
});
exports.getTeamList = getTeamList;
const getTeamCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getTeamList = yield teamSchema_1.Team.find();
    if (!getTeamList) {
        return res.status(404).json({ error: "No List Found." });
    }
    return res.status(200).json(getTeamList === null || getTeamList === void 0 ? void 0 : getTeamList.length);
});
exports.getTeamCount = getTeamCount;
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, memberCount } = yield req.body;
    return res.json("create team");
});
exports.createTeam = createTeam;
