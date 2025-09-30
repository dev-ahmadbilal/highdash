/**
 * This method is like `clone` except that it accepts `customizer` which is invoked to produce the cloned value.
 *
 * @param value - The value to clone
 * @param customizer - The function to customize cloning
 * @returns Returns the cloned value
 *
 * @example
 * ```typescript
 * function customizer(value) {
 *   if (isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * }
 *
 * const el = cloneWith(document.body, customizer);
 * // => <body></body>
 * ```
 */
export function cloneWith<T>(
  value: T,
  customizer?: (value: unknown, key: string | number | symbol, object: unknown, stack: unknown) => unknown,
): T {
  if (customizer) {
    const result = customizer(value, '', value, undefined);
    if (result !== undefined) {
      return result as T;
    }
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneWith(item, customizer)) as T;
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
      clonedMap.set(cloneWith(key, customizer), cloneWith(val, customizer));
    }
    return clonedMap as T;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    for (const val of value) {
      clonedSet.add(cloneWith(val, customizer));
    }
    return clonedSet as T;
  }

  // For plain objects
  const cloned: Record<string, unknown> = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      cloned[key] = cloneWith((value as Record<string, unknown>)[key], customizer);
    }
  }

  return cloned as T;
}
