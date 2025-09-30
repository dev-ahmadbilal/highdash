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
  if (value === null || value === undefined) return {};

  if (typeof value === 'string') {
    const obj: Record<string, unknown> = {};
    const str = String(value);
    for (let i = 0; i < str.length; i++) {
      obj[String(i)] = str[i];
    }
    return obj;
  }

  const result: Record<string, unknown> = {};

  // Copy own enumerable properties (including symbol)
  if (typeof value === 'object') {
    for (const key of Reflect.ownKeys(value as object)) {
      const desc = Object.getOwnPropertyDescriptor(value as object, key);
      if (desc && desc.enumerable) {
        result[key as any] = (value as any)[key as any];
      }
    }

    // Copy inherited enumerable string-keyed properties
    let proto = Object.getPrototypeOf(value as object);
    while (proto && proto !== Object.prototype) {
      for (const key in proto as any) {
        if (Object.prototype.hasOwnProperty.call(proto, key)) {
          result[key] = (proto as any)[key];
        }
      }
      proto = Object.getPrototypeOf(proto);
    }
  }

  return result;
}
