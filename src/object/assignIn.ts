/**
 * This method is like `assign` except that it iterates over own and inherited source properties.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * function Bar() {
 *   this.d = 4;
 * }
 *
 * Foo.prototype.c = 3;
 * Bar.prototype.e = 5;
 *
 * assignIn({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
 * ```
 */
export function assignIn<T extends Record<string, unknown>>(object: T, ...sources: Record<string, unknown>[]): T {
  if (!object || typeof object !== 'object') {
    return object;
  }

  for (const source of sources) {
    if (!source || typeof source !== 'object') {
      continue;
    }

    for (const key in source) {
      (object as Record<string, unknown>)[key] = source[key];
    }
  }

  return object;
}
