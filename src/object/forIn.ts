/**
 * Iterates over own and inherited enumerable string keyed properties of `object` invoking `iteratee` for each property.
 *
 * @param object - The object to iterate over
 * @param iteratee - The function invoked per iteration
 * @returns Returns `object`
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
 * forIn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed)
 * ```
 */
export function forIn<T extends Record<string, unknown>>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => void | boolean,
): T {
  if (!object || typeof object !== 'object') {
    return object;
  }

  for (const key in object) {
    const value = object[key];
    const result = iteratee(value, key, object);
    if (result === false) {
      break;
    }
  }

  return object;
}
