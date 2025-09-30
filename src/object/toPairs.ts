/**
 * Creates an array of own enumerable string keyed-value pairs for `object` which can be consumed by `fromPairs`.
 *
 * @param object - The object to query
 * @returns Returns the key-value pairs
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * toPairs(new Foo);
 * // => [['a', 1], ['b', 2]]
 * ```
 */
export function toPairs<T extends Record<string, unknown>>(object: T): [string, T[keyof T]][];
export function toPairs(object: unknown): [string, unknown][] {
  if (!object || typeof object !== 'object') {
    return [];
  }

  const result: [string, unknown][] = [];

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result.push([key, (object as Record<string, unknown>)[key]]);
    }
  }

  return result;
}
