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

  let current: any = object;

  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i];
    const nextKey = pathParts[i + 1];

    if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
      const isNextIndex = nextKey !== undefined && /^\d+$/.test(String(nextKey));
      const customized = customizer ? customizer(current[key], key, current) : undefined;
      if (customized !== undefined) {
        // If next is a property (non-index), ensure object container
        current[key] = isNextIndex ? customized : {};
      } else {
        current[key] = isNextIndex ? [] : {};
      }
    }

    // Move down one level, ensuring array index parent is array
    let nextContainer = current[key] as any;
    if (/^\d+$/.test(String(nextKey)) && !Array.isArray(nextContainer)) {
      // Replace with array when next segment is an index
      current[key] = [];
      nextContainer = current[key];
    }
    current = nextContainer;
  }

  const lastKey = pathParts[pathParts.length - 1];
  if (Array.isArray(current) && /^\d+$/.test(String(lastKey))) {
    const idx = Number(lastKey);
    if (current[idx] === undefined || typeof current[idx] !== 'object') {
      current[idx] = {};
    }
  }
  current[lastKey] = value;

  return object;
}
