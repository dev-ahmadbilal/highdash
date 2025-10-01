"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPairs = toPairs;
function toPairs(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    const result = [];
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            result.push([key, object[key]]);
        }
    }
    return result;
}
