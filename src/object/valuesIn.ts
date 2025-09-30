/**
 * Creates an array of the own and inherited enumerable string keyed property values of `object`.
 *
 * @param object - The object to query
 * @returns Returns the array of property values
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
 * valuesIn(new Foo);
 * // => [1, 2, 3] (iteration order is not guaranteed)
 * ```
 */
export function valuesIn<T extends Record<string, unknown>>(object: T): T[keyof T][];
export function valuesIn(object: unknown): unknown[] {
  if (!object || typeof object !== 'object') {
    return [];
  }

  const result: unknown[] = [];

  for (const key in object) {
    result.push((object as Record<string, unknown>)[key]);
  }

  return result;
}
