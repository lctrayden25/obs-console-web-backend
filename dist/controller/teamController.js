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
exports.updateTeam = exports.getTeam = exports.createTeam = exports.getTeamCount = exports.getTeamList = void 0;
const teamSchema_1 = require("../model/teamSchema");
const getTeamList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, member, team } = req === null || req === void 0 ? void 0 : req.query;
    const getTeamList = yield teamSchema_1.Team.find();
    if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = getTeamList.slice(startIndex, endIndex);
        if (!result) {
            return res.status(502).json({ message: "Internal Server Error" }).end();
        }
        return res.status(200).json(result).end();
    }
    else {
        return res.status(200).json(getTeamList).end();
    }
});
exports.getTeamList = getTeamList;
const getTeamCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield teamSchema_1.Team.find();
    if (!result) {
        return res.status(404).json({ message: "No List Found." }).end();
    }
    return res.status(200).json(result === null || result === void 0 ? void 0 : result.length).end();
});
exports.getTeamCount = getTeamCount;
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, memberCount, joinAt } = yield req.body;
    if (!name || !memberCount)
        return res
            .status(502)
            .json({ message: "name or memberCount not provieded." })
            .end();
    const createData = {
        name,
        memberCount,
        joinAt: joinAt !== null && joinAt !== void 0 ? joinAt : Date.now(),
        updatedBy: null,
    };
    const create = yield teamSchema_1.Team.create(createData);
    if (!create)
        return res.status(502).json({ message: "Internal Server Error" }).end();
    return res.status(200).json({ message: "Team Created." }).end();
});
exports.createTeam = createTeam;
const getTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const teamId = yield ((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!teamId)
        return res.status(502).json({ error: "TeamId No Found Or Missing." }).end();
    const getTeam = yield teamSchema_1.Team.findById(teamId);
    if (!getTeam)
        return res
            .status(404)
            .json({ error: `Team With ID ${teamId} Not Found` })
            .end();
    return res.status(200).json(getTeam).end();
});
exports.getTeam = getTeam;
const updateTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, memberCount } = req.body;
    if (!id)
        return res.status(404).json({ error: "TeamId No Found Or Missing." }).end();
    const updateTeam = yield teamSchema_1.Team.findByIdAndUpdate(id, { name, memberCount });
    if (!updateTeam)
        return res.status(500).json({ error: "Internal Server Error" });
    return res
        .status(200)
        .json({ message: "Update the team data successfully." });
});
exports.updateTeam = updateTeam;
