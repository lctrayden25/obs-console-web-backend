"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const memberSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    nickName: {
        type: String,
    },
    phone: {
        type: String,
        require: true,
        unique: true,
    },
    gender: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    yearOfBirth: {
        type: String,
        require: true,
    },
    monthOfBirth: {
        type: String,
    },
    position: {
        type: [String],
    },
    updatedBy: {
        type: String,
        default: "Rayden Li",
    },
    // team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
}, {
    timestamps: true,
});
exports.Member = mongoose_1.default.model("Member", memberSchema);
