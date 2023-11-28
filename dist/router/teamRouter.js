"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
exports.teamRouter = router;
const teamController_1 = require("../controller/teamController");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
router.get("/get-team-list", teamController_1.getTeamList);
router.post("/create-team", verifyAdmin_1.verifyAdmin, teamController_1.createTeam);
router.get("/get-team/:id", verifyAdmin_1.verifyAdmin, teamController_1.getTeam);
router.put("/update-team/:id", verifyAdmin_1.verifyAdmin, teamController_1.updateTeam);
router.delete("/delete-team/:id", verifyAdmin_1.verifyAdmin, teamController_1.deleteTeam);
