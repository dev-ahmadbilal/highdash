/**
 * Creates an array of own and inherited enumerable string keyed-value pairs for `object` which can be consumed by `fromPairs`.
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
 * toPairsIn(new Foo);
 * // => [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
export function toPairsIn<T extends Record<string, unknown>>(object: T): [string, T[keyof T]][]
export function toPairsIn(object: unknown): [string, unknown][] {
  if (!object || typeof object !== 'object') {
    return []
  }

  const result: [string, unknown][] = []

  for (const key in object) {
    result.push([key, (object as Record<string, unknown>)[key]])
  }

  return result
}
