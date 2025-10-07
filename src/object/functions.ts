/**
 * Creates an array of function property names from own enumerable properties of `object`.
 *
 * @param object - The object to inspect
 * @returns Returns the function names
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = () => 'a';
 *   this.b = () => 'b';
 * }
 *
 * Foo.prototype.c = () => 'c';
 *
 * functions(new Foo);
 * // => ['a', 'b']
 * ```
 */
export function functions<T extends Record<string, unknown>>(object: T): string[] {
  if (!object || typeof object !== 'object') {
    return []
  }

  const result: string[] = []

  for (const key in object) {
    if (Object.hasOwn(object, key)) {
      const value = object[key]
      if (typeof value === 'function') {
        result.push(key)
      }
    }
  }

  return result
}
