"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (page, limit, result) => {
    if (!page || !limit)
        return result;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const getResult = result === null || result === void 0 ? void 0 : result.slice(startIndex, endIndex);
    return getResult;
};
exports.pagination = pagination;
