/**
 * Casts `value` as an array if it's not one.
 *
 * @param value - The value to inspect
 * @returns Returns the cast array
 *
 * @example
 * ```typescript
 * castArray(1);
 * // => [1]
 *
 * castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * castArray('abc');
 * // => ['abc']
 *
 * castArray(null);
 * // => [null]
 *
 * castArray(undefined);
 * // => [undefined]
 *
 * castArray();
 * // => []
 *
 * castArray([1, 2, 3]);
 * // => [1, 2, 3]
 * ```
 */
export function castArray<T>(value: T): T extends unknown[] ? T : T[] {
  if (Array.isArray(value)) {
    return value as T extends unknown[] ? T : T[];
  }
  return [value] as T extends unknown[] ? T : T[];
}
