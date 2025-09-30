/**
 * Creates a shallow clone of `value`.
 *
 * @param value - The value to clone
 * @returns Returns the cloned value
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'b': 2 }];
 * const shallow = clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 * ```
 */
export function clone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (Array.isArray(value)) {
    return [...value] as T;
  }

  if (value instanceof Map) {
    return new Map(value) as T;
  }

  if (value instanceof Set) {
    return new Set(value) as T;
  }

  // Handle plain objects
  return { ...value } as T;
}
