"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.authRouter = router;
const authController_1 = require("../controller/authController");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
router.post("/login", authController_1.login);
router.get("/logout", authController_1.logout);
router.post("/me", authController_1.authAdmin);
router.post("/update-password", verifyAdmin_1.verifyAdmin, authController_1.updateAdminPassword);
