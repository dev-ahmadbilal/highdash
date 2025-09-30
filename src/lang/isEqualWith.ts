/**
 * This method is like `isEqual` except that it accepts `customizer` which is invoked to compare values.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @param customizer - The function to customize comparisons
 * @returns Returns `true` if the values are equivalent, else `false`
 *
 * @example
 * ```typescript
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 *
 * const array = ['hello', 'goodbye'];
 * const other = ['hi', 'goodbye'];
 *
 * isEqualWith(array, other, customizer);
 * // => true
 * ```
 */
function baseIsEqualWith(
  value: unknown,
  other: unknown,
  customizer?: (
    objValue: unknown,
    othValue: unknown,
    key: string | number | symbol,
    object: unknown,
    other: unknown,
    stack: unknown,
  ) => boolean | undefined,
  key?: string | number | symbol,
  parentA?: unknown,
  parentB?: unknown,
): boolean {
  if (customizer) {
    const custom = customizer(value, other, (key as any) ?? ('' as any), parentA ?? value, parentB ?? other, undefined);
    if (custom !== undefined) return custom;
  }

  if (value === other) return true;

  if (value === null || other === null || typeof value !== 'object' || typeof other !== 'object') {
    return false;
  }

  if (Array.isArray(value) !== Array.isArray(other)) {
    return false;
  }

  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }

    for (let i = 0; i < value.length; i++) {
      if (!baseIsEqualWith(value[i], other[i], customizer, i, value, other)) {
        return false;
      }
    }
    return true;
  }

  const valueObj = value as Record<string, unknown>;
  const otherObj = other as Record<string, unknown>;

  const valueKeys = Object.keys(valueObj);
  const otherKeys = Object.keys(otherObj);

  if (valueKeys.length !== otherKeys.length) {
    return false;
  }

  for (const k of valueKeys) {
    if (!otherKeys.includes(k)) {
      return false;
    }
    if (!baseIsEqualWith(valueObj[k], otherObj[k], customizer, k, valueObj, otherObj)) {
      return false;
    }
  }

  return true;
}

export function isEqualWith(
  value: unknown,
  other: unknown,
  customizer?: (
    objValue: unknown,
    othValue: unknown,
    key: string | number | symbol,
    object: unknown,
    other: unknown,
    stack: unknown,
  ) => boolean | undefined,
): boolean {
  return baseIsEqualWith(value, other, customizer);
}
