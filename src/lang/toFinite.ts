/**
 * Converts `value` to a finite number.
 *
 * @param value - The value to convert
 * @returns Returns the converted number
 *
 * @example
 * ```typescript
 * toFinite(3.2);
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2');
 * // => 3.2
 * ```
 */
export function toFinite(value: unknown): number {
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
