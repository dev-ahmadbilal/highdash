/**
 * Creates an array of function property names from own and inherited enumerable properties of `object`.
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
 * functionsIn(new Foo);
 * // => ['a', 'b', 'c']
 * ```
 */
export function functionsIn<T extends Record<string, unknown>>(object: T): string[] {
  if (!object || typeof object !== 'object') {
    return [];
  }

  const result: string[] = [];

  for (const key in object) {
    const value = object[key];
    if (typeof value === 'function') {
      result.push(key);
    }
  }

  return result;
}
