"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesIn = entriesIn;
function entriesIn(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    const result = [];
    // Get all properties (own and inherited)
    for (const key in object) {
        result.push([key, object[key]]);
    }
    return result;
}
