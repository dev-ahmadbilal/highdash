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
 * entriesIn(new Foo);
 * // => [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
export function entriesIn<T extends Record<string, unknown>>(object: T): [string, T[keyof T]][]
export function entriesIn(object: unknown): [string, unknown][] {
  if (!object || typeof object !== 'object') {
    return []
  }

  const result: [string, unknown][] = []

  // Get all properties (own and inherited)
  for (const key in object) {
    result.push([key, (object as Record<string, unknown>)[key]])
  }

  return result
}
