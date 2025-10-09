/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * @param object - The object to query
 * @returns Returns the array of property names
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
 * keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 * ```
 */
export function keysIn<T extends Record<string, unknown>>(object: T): string[]
export function keysIn(object: unknown): string[] {
  if (!object || typeof object !== 'object') {
    return []
  }

  const result: string[] = []

  for (const key in object) {
    result.push(key)
  }

  return result
}
