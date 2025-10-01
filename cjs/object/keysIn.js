"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysIn = keysIn;
function keysIn(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    const result = [];
    for (const key in object) {
        result.push(key);
    }
    return result;
}
