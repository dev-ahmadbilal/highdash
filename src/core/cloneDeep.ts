/**
 * Creates a deep clone of `value`. Recursively clones arrays, objects, maps, sets, and other complex types.
 *
 * @param value - The value to recursively clone
 * @returns Returns the deep cloned value
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'b': 2 }];
 * const deep = cloneDeep(objects);
 * console.log(deep[0] === objects[0]); // false
 * ```
 */
export function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (value instanceof Map) {
    const clonedMap = new Map();
    for (const [key, val] of value) {
      clonedMap.set(cloneDeep(key), cloneDeep(val));
    }
    return clonedMap as T;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    for (const val of value) {
      clonedSet.add(cloneDeep(val));
    }
    return clonedSet as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item)) as T;
  }

  if (value instanceof ArrayBuffer) {
    return value.slice() as T;
  }

  if (value instanceof DataView) {
    return new DataView(value.buffer.slice(), value.byteOffset, value.byteLength) as T;
  }

  if (
    value instanceof Int8Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int16Array ||
    value instanceof Uint16Array ||
    value instanceof Int32Array ||
    value instanceof Uint32Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array ||
    value instanceof BigInt64Array ||
    value instanceof BigUint64Array
  ) {
    return value.slice() as T;
  }

  // Handle plain objects
  const cloned = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      (cloned as Record<string, unknown>)[key] = cloneDeep((value as Record<string, unknown>)[key]);
    }
  }

  return cloned;
}
