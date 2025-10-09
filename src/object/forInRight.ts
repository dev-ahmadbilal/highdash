/**
 * This method is like `forIn` except that it iterates over properties in reverse order.
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
 * forInRight(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'c', 'b', then 'a' (iteration order is not guaranteed)
 * ```
 */
export function forInRight<T extends Record<string, unknown>>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => void | boolean,
): T {
  if (!object || typeof object !== 'object') {
    return object
  }

  const keys: string[] = []
  for (const key in object) {
    keys.push(key)
  }

  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i]
    const value = object[key]
    const result = iteratee(value as T[keyof T], key, object)
    if (result === false) {
      break
    }
  }

  return object
}
