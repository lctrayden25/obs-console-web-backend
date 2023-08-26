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
exports.updateAdminPassword = exports.authAdmin = exports.logout = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSchema_1 = require("../model/adminSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(404).json({ message: "Admin not found." });
    const getAdmin = yield adminSchema_1.Admin.findOne({ email });
    const { password: dbPassword } = getAdmin !== null && getAdmin !== void 0 ? getAdmin : {};
    const comparePwd = yield bcrypt_1.default.compare(password, dbPassword);
    if (!comparePwd) {
        return res.status(500).json({ message: "Password is not correct." });
    }
    const { _id, role, createdAt } = getAdmin !== null && getAdmin !== void 0 ? getAdmin : {};
    const token = jsonwebtoken_1.default.sign({ data: { _id, role, createdAt } }, process.env.PRIVATE_KEY, { expiresIn: "2 days" });
    if (!token) {
        return res.status(500).json({ message: "Token unavailable." }).end();
    }
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    res
        .status(200)
        .json({ message: "Login successfully", isLogin: true, token: token });
    res.end();
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res
        .status(200)
        .json({ message: "The user has been logged out", isLgoin: false });
    res.end();
});
exports.logout = logout;
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        return res
            .status(502)
            .json({ message: "Admin authenication failed." })
            .end();
    }
    const auth = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
    return res.status(200).json({ auth }).end();
});
exports.authAdmin = authAdmin;
const updateAdminPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json("Update Password");
});
exports.updateAdminPassword = updateAdminPassword;
