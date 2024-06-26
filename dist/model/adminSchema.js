"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
})(UserRole || (UserRole = {}));
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        default: UserRole.Admin,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
