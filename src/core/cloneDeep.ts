/**
 * Creates a deep clone of `value`. Recursively clones arrays, objects, maps, sets, and other complex types.
 *
 * @param value - The value to recursively clone
 * @returns Returns the deep cloned value
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'b': 2 }];
 * const deep = cloneDeep(objects);
 * console.log(deep[0] === objects[0]); // false
 * ```
 */
export function cloneDeep<T>(value: T): T {
  // Delegate to cloneDeepWith engine without a customizer to gain cycles & symbol handling
  return cloneDeepWith(value)
}

import { cloneDeepWith } from './cloneDeepWith.js'
