/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if the values are equivalent, else `false`
 *
 * @example
 * ```typescript
 * const object = { 'a': 1 };
 * const other = { 'a': 1 };
 * isEqual(object, other);
 * // => true
 *
 * isEqual('hello', 'hello');
 * // => true
 * ```
 */
export function isEqual(value: unknown, other: unknown): boolean {
  if (value === other) {
    return true;
  }

  if (value === null || other === null || value === undefined || other === undefined) {
    return value === other;
  }

  if (typeof value !== typeof other) {
    return false;
  }

  if (typeof value !== 'object') {
    return value === other;
  }

  if (Array.isArray(value) !== Array.isArray(other)) {
    return false;
  }

  if (Array.isArray(value)) {
    if (!Array.isArray(other) || value.length !== other.length) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }
    return true;
  }

  if (value instanceof Date && other instanceof Date) {
    return value.getTime() === other.getTime();
  }

  if (value instanceof RegExp && other instanceof RegExp) {
    return value.toString() === other.toString();
  }

  if (value instanceof Map && other instanceof Map) {
    if (value.size !== other.size) {
      return false;
    }
    for (const [key, val] of value) {
      if (!other.has(key) || !isEqual(val, other.get(key))) {
        return false;
      }
    }
    return true;
  }

  if (value instanceof Set && other instanceof Set) {
    if (value.size !== other.size) {
      return false;
    }
    for (const val of value) {
      if (!other.has(val)) {
        return false;
      }
    }
    return true;
  }

  // Handle plain objects
  const valueObj = value as Record<string, unknown>;
  const otherObj = other as Record<string, unknown>;
  const valueKeys = Object.keys(valueObj);
  const otherKeys = Object.keys(otherObj);

  if (valueKeys.length !== otherKeys.length) {
    return false;
  }

  for (const key of valueKeys) {
    if (!otherKeys.includes(key)) {
      return false;
    }
    if (!isEqual(valueObj[key], otherObj[key])) {
      return false;
    }
  }

  return true;
}
