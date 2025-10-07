/**
 * This method is like `update` except that it accepts `customizer` which is invoked to produce the objects of `path`.
 *
 * @param object - The object to modify
 * @param path - The path of the property to set
 * @param updater - The function to produce the updated value
 * @param customizer - The function to customize path creation
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = {};
 * updateWith(object, '[0][1]', () => 'a', Object);
 * // => { '0': { '1': 'a' } }
 * ```
 */
export function updateWith<T extends Record<string, unknown>>(
  object: T,
  path: string | string[],
  updater: (value: unknown) => unknown,
  customizer?: (nsValue: unknown, key: string, nsObject: Record<string, unknown>) => unknown,
): T {
  if (!object || typeof object !== 'object') {
    return object
  }

  const pathParts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)

  if (pathParts.length === 0) {
    return object
  }

  let current: Record<string, unknown> = object

  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i]

    if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
      const newValue = customizer ? customizer(current[key], key, current) : {}
      current[key] = newValue !== undefined ? newValue : {}
    }

    current = current[key] as Record<string, unknown>
  }

  const lastKey = pathParts[pathParts.length - 1]
  const currentValue = current[lastKey]
  current[lastKey] = updater(currentValue)

  return object
}
