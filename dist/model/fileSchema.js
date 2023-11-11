"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
        type: mongoose_1.Types.ObjectId,
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
//# sourceMappingURL=fileSchema.js.map