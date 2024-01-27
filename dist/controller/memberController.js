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
exports.deleteMember = exports.updateMember = exports.createMember = exports.getMember = exports.getMemberList = void 0;
const memberSchema_1 = require("../model/memberSchema");
const helper_1 = require("../helper");
const getMemberList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, name } = req === null || req === void 0 ? void 0 : req.query;
    const isFullList = page === undefined || limit === undefined;
    let result = [];
    if (name === "" || isFullList) {
        result = yield memberSchema_1.Member.find().populate("team");
    }
    else {
        if (name) {
            result = yield memberSchema_1.Member.find({
                $or: [
                    { lastName: { $regex: name !== null && name !== void 0 ? name : "", $options: "i" } },
                    { firstName: { $regex: name !== null && name !== void 0 ? name : "", $options: "i" } },
                ],
            });
        }
    }
    const paginatedResult = (0, helper_1.pagination)(page, limit, result);
    return res.status(200).json({
        list: isFullList ? result : paginatedResult,
        count: result === null || result === void 0 ? void 0 : result.length,
    });
});
exports.getMemberList = getMemberList;
const getMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    if (!id)
        return res.status(404).json({ error: `Member ID - ${id} Not Found.` });
    const getMember = yield memberSchema_1.Member.findById(id).populate("team");
    return res.status(200).json(getMember);
});
exports.getMember = getMember;
const createMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const memberData = req === null || req === void 0 ? void 0 : req.body;
    const { phone } = memberData !== null && memberData !== void 0 ? memberData : {};
    const isExistedMember = yield memberSchema_1.Member.findOne({ phone });
    if (isExistedMember)
        return res
            .status(409)
            .json({ error: "Member Existed In Collection Already." });
    const createMember = yield memberSchema_1.Member.create(memberData);
    if (!createMember)
        return res.status(400).json({ error: "Bad User Input." });
    return res.status(200).json({ message: "Member Created Successfully." });
});
exports.createMember = createMember;
const updateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const memberData = req === null || req === void 0 ? void 0 : req.body;
    if (!id)
        return res.status(404).json({ error: `Member ID - ${id} Not Found.` });
    const updateMember = yield memberSchema_1.Member.findByIdAndUpdate(id, memberData);
    if (!updateMember)
        return res.status(403).json({ error: "Bad User Input" });
    return res.status(200).json({ message: "Update member successfully." });
});
exports.updateMember = updateMember;
const deleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    if (!id)
        return res.status(404).json({ error: `Member ID - ${id} Not Found.` });
    const deleteMember = yield memberSchema_1.Member.findByIdAndDelete({ _id: id });
    if (!deleteMember)
        return res.status(500).json({ error: "Internal Server Error." });
    return res.status(200).json({ message: "Delete Member Successfully." });
});
exports.deleteMember = deleteMember;
