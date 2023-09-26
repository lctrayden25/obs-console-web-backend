"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.teamRouter = router;
const teamController_1 = require("../controller/teamController");
router.get("/get-team-list", teamController_1.getTeamList);
// router.get("/get-team-count", getTeamCount);
router.post("/create-team", teamController_1.createTeam);
router.get("/get-team/:id", teamController_1.getTeam);
router.put("/update-team/:id", teamController_1.updateTeam);
router.delete("/delete-team/:id", teamController_1.deleteTeam);
router.get("/export-team-list-excel", teamController_1.exportTeamlist);
