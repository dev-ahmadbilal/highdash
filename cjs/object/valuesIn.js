"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valuesIn = valuesIn;
function valuesIn(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    const result = [];
    for (const key in object) {
        result.push(object[key]);
    }
    return result;
}
