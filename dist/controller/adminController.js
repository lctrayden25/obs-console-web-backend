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
exports.createAdmin = exports.createDefaultAdmin = void 0;
const adminSchema_1 = require("../model/adminSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createDefaultAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = "obsadmin@gmail.com";
    const password = "obsadmin123";
    const role = "admin";
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const adminData = {
        name: email,
        email,
        password: hashPassword,
        role,
    };
    if (!hashPassword) {
        return res.status(502).json({ message: "Cannot Hash Password." });
    }
    const createAdmin = yield adminSchema_1.Admin.create(adminData);
    if (!createAdmin) {
        return res.status(502).json({ message: "Create Admin Failure." });
    }
    return res.status(200).json({ message: "Admin Created." });
});
exports.createDefaultAdmin = createDefaultAdmin;
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createAdmin = createAdmin;
