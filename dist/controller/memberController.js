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
exports.getMemberCount = exports.getMemberList = exports.createMember = void 0;
const memberSchema_1 = require("../model/memberSchema");
const createMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        firstName: "Rayden",
        lastName: "Li",
        phone: "55654453",
        gender: "Male",
        email: "rayden@gmail.com",
        dateOfYear: 1997,
        dateOfMonth: 9,
        position: ["guard"],
        updatedBy: "rayden",
    };
    const create = yield memberSchema_1.Member.create(data);
    return res.status(200).json("create").end();
});
exports.createMember = createMember;
const getMemberList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const memberList = yield memberSchema_1.Member.find();
    return res.status(200).json(memberList).end();
});
exports.getMemberList = getMemberList;
const getMemberCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const memberList = yield memberSchema_1.Member.find();
    return res.status(200).json(memberList === null || memberList === void 0 ? void 0 : memberList.length).end();
});
exports.getMemberCount = getMemberCount;
