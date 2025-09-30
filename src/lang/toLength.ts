/**
 * Converts `value` to an integer suitable for use as the length of an array-like object.
 *
 * @param value - The value to convert
 * @returns Returns the converted integer
 *
 * @example
 * ```typescript
 * toLength(3.2);
 * // => 3
 *
 * toLength(Number.MIN_VALUE);
 * // => 0
 *
 * toLength(Infinity);
 * // => 4294967295
 *
 * toLength('3.2');
 * // => 3
 * ```
 */
export function toLength(value: unknown): number {
  const integer = toInteger(value);

  if (integer <= 0) {
    return 0;
  }

  // Clamp to Number.MAX_SAFE_INTEGER like lodash
  const MAX_SAFE = Number.MAX_SAFE_INTEGER;
  if (integer > MAX_SAFE) {
    return MAX_SAFE;
  }

  return integer;
}

/**
 * Converts `value` to an integer.
 */
function toInteger(value: unknown): number {
  const finite = toFinite(value);

  if (finite === 0) {
    return 0;
  }
  // Truncate toward zero
  return finite < 0 ? Math.ceil(finite) : Math.floor(finite);
}

/**
 * Converts `value` to a finite number.
 */
function toFinite(value: unknown): number {
  if (typeof value === 'bigint') {
    const num = Number(value);
    return isFinite(num) ? num : 0;
  }
  if (typeof value === 'number') {
    if (isFinite(value)) {
      return value;
    }
    return value > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE;
  }

  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (isFinite(parsed)) {
      return parsed;
    }
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }

  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === 'object' && value !== null) {
    // Handle BigInt explicitly
    if (typeof (value as any) === 'bigint') {
      const num = Number(value as any);
      return isFinite(num) ? num : 0;
    }
    // Try numeric coercion via valueOf()/toString()
    const primitive = (value as any).valueOf?.() ?? value;
    if (typeof primitive === 'bigint') {
      const num = Number(primitive);
      return isFinite(num) ? num : 0;
    }
    const num = Number(primitive);
    if (isFinite(num)) return num;
  }

  return 0;
}
