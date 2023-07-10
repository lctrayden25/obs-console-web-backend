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
exports.editTeam = exports.getTeam = exports.createTeam = exports.getTeamCount = exports.getTeamList = void 0;
const teamSchema_1 = require("../model/teamSchema");
const getTeamList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getTeamList = yield teamSchema_1.Team.find();
    if (!getTeamList) {
        return res.status(502).json({ message: "Internal Server Error" });
    }
    return res.status(200).json(getTeamList);
});
exports.getTeamList = getTeamList;
const getTeamCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getTeamList = yield teamSchema_1.Team.find();
    if (!getTeamList) {
        return res.status(404).json({ message: "No List Found." });
    }
    return res.status(200).json(getTeamList === null || getTeamList === void 0 ? void 0 : getTeamList.length);
});
exports.getTeamCount = getTeamCount;
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, memberCount, joinAt } = yield req.body;
    if (!name || !memberCount)
        return res
            .status(502)
            .json({ message: "name or memberCount not provieded." });
    const createData = {
        name,
        memberCount,
        joinAt: joinAt !== null && joinAt !== void 0 ? joinAt : Date.now(),
        updatedBy: null,
    };
    const create = yield teamSchema_1.Team.create(createData);
    if (!create)
        return res.status(502).json({ message: "Internal Server Error" });
    return res.status(200).json({ message: "Team Created." });
});
exports.createTeam = createTeam;
const getTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const teamId = yield ((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!teamId)
        return res.status(502).json({ error: "TeamId No Found Or Missing." });
    const getTeam = yield teamSchema_1.Team.findById(teamId);
    if (!getTeam)
        return res.status(404).json({ error: `Team With ID ${teamId} Found` });
    return res.status(200).json(getTeam);
});
exports.getTeam = getTeam;
const editTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const teamId = yield ((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    return res.json(teamId);
});
exports.editTeam = editTeam;
