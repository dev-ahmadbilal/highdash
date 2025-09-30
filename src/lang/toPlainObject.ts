/**
 * Converts `value` to a plain object flattening inherited enumerable string keyed properties of `value` to own properties of the plain object.
 *
 * @param value - The value to convert
 * @returns Returns the converted plain object
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * toPlainObject(new Foo);
 * // => { 'b': 2, 'c': 3 }
 * ```
 */
export function toPlainObject(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return {};
  }

  const result: Record<string, unknown> = {};

  // Copy own properties
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = (value as Record<string, unknown>)[key];
    }
  }

  // Copy inherited enumerable properties
  let current = value;
  while (current && current !== Object.prototype) {
    const proto = Object.getPrototypeOf(current);
    if (proto && proto !== Object.prototype) {
      for (const key in proto) {
        if (Object.prototype.hasOwnProperty.call(proto, key)) {
          result[key] = (proto as Record<string, unknown>)[key];
        }
      }
    }
    current = proto;
  }

  return result;
}
