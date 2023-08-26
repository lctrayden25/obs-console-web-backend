"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const teamSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    memberCount: {
        type: Number,
    },
    joinAt: {
        type: Date,
    },
    updatedBy: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Team = mongoose_1.default.model("Team", teamSchema);
