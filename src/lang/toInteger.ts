/**
 * Converts `value` to an integer.
 *
 * @param value - The value to convert
 * @returns Returns the converted integer
 *
 * @example
 * ```typescript
 * toInteger(3.2);
 * // => 3
 *
 * toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2');
 * // => 3
 * ```
 */
export function toInteger(value: unknown): number {
  const finite = toFinite(value);

  if (finite === 0) {
    return 0;
  }

  if (finite === Number.MAX_VALUE || finite === -Number.MAX_VALUE) {
    const sign = finite < 0 ? -1 : 1;
    return sign * Number.MAX_VALUE;
  }

  return Math.floor(Math.abs(finite)) * (finite < 0 ? -1 : 1);
}

/**
 * Converts `value` to a finite number.
 */
function toFinite(value: unknown): number {
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
    // Try valueOf first, then toString
    if (typeof (value as any).valueOf === 'function') {
      const valueOfResult = (value as any).valueOf();
      if (typeof valueOfResult === 'number' && isFinite(valueOfResult)) {
        return valueOfResult;
      }
    }

    const stringValue = String(value);
    const parsed = parseFloat(stringValue);
    if (isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}
