"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPairsIn = toPairsIn;
function toPairsIn(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    const result = [];
    for (const key in object) {
        result.push([key, object[key]]);
    }
    return result;
}
