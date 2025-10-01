"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexBy = indexBy;
/**
 * Indexes a collection into a Map of key -> last item with that key.
 *
 * @example
 * indexBy([{id:1},{id:2}], 'id') // Map { 1 => {id:1}, 2 => {id:2} }
 */
function indexBy(collection, selector) {
    const map = new Map();
    if (!collection)
        return map;
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    const getKey = typeof selector === 'function' ? selector : (item) => item === null || item === void 0 ? void 0 : item[selector];
    for (const item of items) {
        map.set(getKey(item), item);
    }
    return map;
}
