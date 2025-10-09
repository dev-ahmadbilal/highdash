/**
 * Creates an array of the own enumerable property names of `object`.
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
 * Foo.prototype.c = 3;
 * keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 * ```
 */
export function keys<T extends Record<string, unknown>>(object: T): (keyof T)[] {
  if (!object || typeof object !== 'object') {
    return []
  }

  return Object.keys(object) as (keyof T)[]
}
