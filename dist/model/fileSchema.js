"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const fileSchema = new mongoose_2.Schema({
    name: {
        type: String,
        require: false,
    },
    url: {
        type: String,
        require: true,
    },
    key: {
        require: true,
    },
    size: {
        type: Number,
        require: true,
    },
    contentType: {
        type: String,
        require: true,
    },
}, {
    versionKey: false,
    timestamps: false,
    _id: false,
});
exports.File = mongoose_1.default.model("File", fileSchema);
