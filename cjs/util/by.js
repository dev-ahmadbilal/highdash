"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.by = by;
exports.thenBy = thenBy;
function defaultCompare(a, b, opts) {
    const { order = 'asc', nulls = 'last', collator } = opts;
    const dir = order === 'asc' ? 1 : -1;
    const aU = a === undefined || a === null;
    const bU = b === undefined || b === null;
    if (aU || bU) {
        if (aU && bU)
            return 0;
        return (nulls === 'first' ? -1 : 1) * (aU ? 1 : -1) * dir;
    }
    if (typeof a === 'string' && typeof b === 'string' && collator) {
        return collator.compare(a, b) * dir;
    }
    // Fallback numeric/lexicographic
    return (a < b ? -1 : a > b ? 1 : 0) * dir;
}
function by(selector, options = {}) {
    const get = typeof selector === 'function' ? selector : (obj) => obj === null || obj === void 0 ? void 0 : obj[selector];
    return (a, b) => defaultCompare(get(a), get(b), options);
}
function thenBy(prev, selector, options = {}) {
    const next = by(selector, options);
    return (a, b) => {
        const r = prev(a, b);
        return r !== 0 ? r : next(a, b);
    };
}
/**
 * @example
 * const cmp = thenBy(by('lastName'), 'firstName');
 * users.sort(cmp);
 */
