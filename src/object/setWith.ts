/**
 * This method is like `set` except that it accepts `customizer` which is invoked to produce the objects of `path`.
 *
 * @param object - The object to modify
 * @param path - The path of the property to set
 * @param value - The value to set
 * @param customizer - The function to customize path creation
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = {};
 * setWith(object, '[0][1]', 'a', Object);
 * // => { '0': { '1': 'a' } }
 * ```
 */
export function setWith<T extends Record<string, unknown>>(
  object: T,
  path: string | string[],
  value: unknown,
  customizer?: (nsValue: unknown, key: string, nsObject: Record<string, unknown>) => unknown,
): T {
  if (!object || typeof object !== 'object') {
    return object;
  }

  const pathParts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);

  let current: Record<string, unknown> = object;

  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i];

    if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
      const newValue = customizer ? customizer(current[key], key, current) : {};
      current[key] = newValue !== undefined ? newValue : {};
    }

    current = current[key] as Record<string, unknown>;
  }

  const lastKey = pathParts[pathParts.length - 1];
  current[lastKey] = value;

  return object;
}
