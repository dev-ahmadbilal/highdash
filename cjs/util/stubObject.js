"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubObject = stubObject;
/**
 * This method returns a new empty object.
 *
 * @returns Returns the new empty object
 *
 * @example
 * ```typescript
 * const objects = times(2, stubObject);
 * console.log(objects);
 * // => [{}, {}]
 *
 * console.log(objects[0] === objects[1]);
 * // => false
 * ```
 */
function stubObject() {
    return {};
}
