"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupToMap = groupToMap;
/**
 * Groups a collection by a key selector into a Map of key -> items[].
 *
 * @example
 * groupToMap(['a','bb','c'], 'length') // Map { 1 => ['a','c'], 2 => ['bb'] }
 */
function groupToMap(collection, selector) {
    const map = new Map();
    if (!collection)
        return map;
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    const getKey = typeof selector === 'function' ? selector : (item) => item === null || item === void 0 ? void 0 : item[selector];
    for (const item of items) {
        const key = getKey(item);
        const arr = map.get(key);
        if (arr)
            arr.push(item);
        else
            map.set(key, [item]);
    }
    return map;
}
