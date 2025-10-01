"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countByToMap = countByToMap;
/**
 * Counts items by key into a Map of key -> count.
 *
 * @example
 * countByToMap(['a','bb','c'], 'length') // Map { 1 => 2, 2 => 1 }
 */
function countByToMap(collection, selector) {
    var _a;
    const map = new Map();
    if (!collection)
        return map;
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    const getKey = typeof selector === 'function' ? selector : (item) => item === null || item === void 0 ? void 0 : item[selector];
    for (const item of items) {
        const k = getKey(item);
        map.set(k, ((_a = map.get(k)) !== null && _a !== void 0 ? _a : 0) + 1);
    }
    return map;
}
