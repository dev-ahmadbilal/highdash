/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object.
 * Source properties that resolve to `undefined` are skipped if a destination value exists.
 * Array and plain object properties are merged recursively. Other objects and value types are overridden by assignment.
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 * merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 * ```
 */
export function merge<T extends Record<string, unknown>>(object: T, ...sources: Partial<T>[]): T {
  if (!isObject(object)) {
    return object;
  }

  for (const source of sources) {
    if (!isObject(source)) {
      continue;
    }

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const objectValue = object[key];

        if (
          isObject(sourceValue) &&
          isObject(objectValue) &&
          !Array.isArray(sourceValue) &&
          !Array.isArray(objectValue)
        ) {
          object[key] = merge(
            objectValue as Record<string, unknown>,
            sourceValue as Record<string, unknown>,
          ) as T[Extract<keyof T, string>];
        } else {
          object[key] = sourceValue as T[Extract<keyof T, string>];
        }
      }
    }
  }

  return object;
}

/**
 * Checks if `value` is the language type of `Object` (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`).
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an object, else `false`
 */
function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}
