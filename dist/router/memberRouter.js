"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.memberRouter = router;
const memberController_1 = require("../controller/memberController");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
router.post("/create-member", verifyAdmin_1.verifyAdmin, memberController_1.createMember);
router.get("/get-member/:id", verifyAdmin_1.verifyAdmin, memberController_1.getMember);
router.post("/update-member/:id", verifyAdmin_1.verifyAdmin, memberController_1.updateMember);
router.get("/get-member-list", verifyAdmin_1.verifyAdmin, memberController_1.getMemberList);
// router.get("/get-member-count", getMemberCount);
router.delete("/delete-member/:id", verifyAdmin_1.verifyAdmin, memberController_1.deleteMember);
