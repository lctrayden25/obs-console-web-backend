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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportTeamlist = exports.deleteTeam = exports.updateTeam = exports.getTeam = exports.createTeam = exports.getTeamList = void 0;
const teamSchema_1 = require("../model/teamSchema");
const exceljs_1 = __importDefault(require("exceljs"));
const helper_1 = require("../helper");
const getTeamList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, team, joinAtStart, joinAtEnd } = req === null || req === void 0 ? void 0 : req.query;
    const isFullList = page === undefined || limit === undefined;
    let result = [];
    if ((team === "" && joinAtStart === "null" && joinAtEnd === "null") ||
        isFullList) {
        result = yield teamSchema_1.Team.find();
    }
    else {
        if (team !== "") {
            result = yield teamSchema_1.Team.find({ name: { $regex: team !== null && team !== void 0 ? team : "", $options: "i" } });
        }
        if (joinAtStart !== "null" && joinAtEnd !== "null") {
            result = yield teamSchema_1.Team.find({
                joinAt: { $gte: joinAtStart, $lte: joinAtEnd },
            });
        }
    }
    const paginatedResult = (0, helper_1.pagination)(page, limit, result);
    return res
        .status(200)
        .json({
        list: isFullList ? result : paginatedResult,
        count: result === null || result === void 0 ? void 0 : result.length,
    })
        .end();
});
exports.getTeamList = getTeamList;
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, memberCount, joinAt } = yield req.body;
    if (!name || !memberCount)
        return res
            .status(502)
            .json({ message: "Field [name] Or [memberCount] Not Provided." })
            .end();
    const createData = {
        name,
        memberCount,
        joinAt: joinAt !== null && joinAt !== void 0 ? joinAt : null,
        updatedBy: null,
    };
    const createTeam = yield teamSchema_1.Team.create(createData);
    if (!createTeam)
        return res.status(502).json({ message: "Internal Server Error" }).end();
    return res.status(200).json({ message: "Team Created." }).end();
});
exports.createTeam = createTeam;
const getTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const teamId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!teamId)
        return res
            .status(502)
            .json({ error: "Team ID No Found Or Missing." })
            .end();
    const getTeam = yield teamSchema_1.Team.findById(teamId);
    if (!getTeam)
        return res
            .status(404)
            .json({ error: `Team ID - ${teamId} Not Found` })
            .end();
    return res.status(200).json(getTeam).end();
});
exports.getTeam = getTeam;
const updateTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, memberCount, joinAt } = req.body;
    if (!id)
        return res
            .status(404)
            .json({ error: "Team ID No Found Or Missing." })
            .end();
    const updateTeam = yield teamSchema_1.Team.findByIdAndUpdate(id, {
        name,
        memberCount,
        joinAt,
    });
    if (!updateTeam)
        return res.status(500).json({ error: "Internal Server Error" });
    return res.status(200).json({ message: "Update Team Data Successfully." });
});
exports.updateTeam = updateTeam;
const deleteTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(409).json({ error: `Team ID - ${id} Not Found` });
    const deleteTeam = yield teamSchema_1.Team.findByIdAndDelete({ _id: id });
    if (!deleteTeam)
        return res.status(500).json({ error: "Internal Server Error." });
    return res.status(200).json({ message: "Delete Team Successfully." });
});
exports.deleteTeam = deleteTeam;
const exportTeamlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const teamList = yield teamSchema_1.Team.find();
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet("Team List");
    const getFields = teamList === null || teamList === void 0 ? void 0 : teamList[0];
    const columns = (_b = Object.getOwnPropertyNames(getFields.toJSON())) === null || _b === void 0 ? void 0 : _b.map((field) => {
        return {
            header: field,
            key: field,
            width: 30,
        };
    });
    worksheet.columns = columns;
    teamList === null || teamList === void 0 ? void 0 : teamList.forEach((team) => {
        worksheet.addRow(team);
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    try {
        yield workbook.xlsx.writeFile("team-list.xlsx").then(() => {
            res.set("Content-Disposition", "attachment; filename=" + "team-list.xlsx");
            res.set(`Content-Type`, `application/octet-stream`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.exportTeamlist = exportTeamlist;
