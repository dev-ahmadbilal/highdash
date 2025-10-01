"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = reject;
/**
 * The opposite of `filter`; this method returns the elements of `collection` that `predicate` does **not** return truthy for.
 *
 * @param collection - The collection to iterate over
 * @param predicate - The function invoked per iteration
 * @returns Returns the new filtered array
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred', 'active': false }
 * ];
 *
 * reject(users, 'active');
 * // => [{ 'user': 'fred', 'active': false }]
 * ```
 */
function reject(collection, predicate) {
    if (!collection) {
        return [];
    }
    const getValue = (() => {
        if (typeof predicate === 'function')
            return predicate;
        if (typeof predicate === 'string') {
            // For reject, treat string predicate as truthiness check and exclude truthy ones
            return (item) => Boolean(item[predicate]);
        }
        if (predicate && typeof predicate === 'object') {
            const entries = Object.entries(predicate);
            return (item) => entries.every(([k, v]) => item[k] === v);
        }
        return () => false;
    })();
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    const result = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!getValue(item, i, collection)) {
            result.push(item);
        }
    }
    return result;
}
