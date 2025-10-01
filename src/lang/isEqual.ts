/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * - Cycle-safe, compares enumerable symbol keys
 * - Supports ArrayBuffer/DataView/TypedArrays, Map, Set, Date, RegExp
 * - Uses SameValueZero for primitives
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if the values are equivalent, else `false`
 *
 * @example
 * isEqual({ a: 1 }, { a: 1 }); // true
 * isEqual([1, 2], [1, 2]); // true
 * isEqual(new Set([1,2]), new Set([2,1])); // true
 */
export function isEqual(value: unknown, other: unknown): boolean {
  const stack = new WeakMap();

  function sameValueZero(a: unknown, b: unknown): boolean {
    return a === b || (a !== a && b !== b);
  }

  function baseIsEqual(a: unknown, b: unknown): boolean {
    if (sameValueZero(a, b)) return true;
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;

    // Cycle detection
    if (stack.has(a) || stack.has(b)) return stack.get(a) === b;
    stack.set(a, b);

    let result = false;
    try {
      if (a instanceof Date && b instanceof Date) {
        result = a.getTime() === b.getTime();
      } else if (a instanceof RegExp && b instanceof RegExp) {
        result = a.toString() === b.toString();
      } else if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
        result = a.byteLength === b.byteLength && new Uint8Array(a).every((val, i) => val === new Uint8Array(b)[i]);
      } else if (a instanceof DataView && b instanceof DataView) {
        result = a.byteLength === b.byteLength && baseIsEqual(a.buffer, b.buffer);
      } else if (
        ArrayBuffer.isView(a) &&
        ArrayBuffer.isView(b) &&
        !(a instanceof DataView) &&
        !(b instanceof DataView)
      ) {
        result =
          a.constructor === b.constructor &&
          (a as any).length === (b as any).length &&
          Array.from(a as any).every((val: any, i: number) => sameValueZero(val, (b as any)[i]));
      } else if (a instanceof Set && b instanceof Set) {
        if (a.size !== b.size) result = false;
        else {
          result = true;
          for (const aVal of a) {
            let found = false;
            for (const bVal of b) {
              if (baseIsEqual(aVal, bVal)) {
                found = true;
                break;
              }
            }
            if (!found) {
              result = false;
              break;
            }
          }
        }
      } else if (a instanceof Map && b instanceof Map) {
        if (a.size !== b.size) result = false;
        else {
          result = true;
          for (const [ak, av] of a) {
            let found = false;
            for (const [bk, bv] of b) {
              if (baseIsEqual(ak, bk) && baseIsEqual(av, bv)) {
                found = true;
                break;
              }
            }
            if (!found) {
              result = false;
              break;
            }
          }
        }
      } else if (Array.isArray(a) && Array.isArray(b)) {
        result = a.length === b.length && a.every((val, i) => baseIsEqual(val, b[i]));
      } else {
        // Object comparison - check constructor first
        if (a.constructor !== b.constructor) {
          result = false;
        } else {
          const aKeys = Object.keys(a as Record<string, unknown>);
          const bKeys = Object.keys(b as Record<string, unknown>);
          if (aKeys.length !== bKeys.length) {
            result = false;
          } else {
            result = aKeys.every(
              (key) =>
                bKeys.includes(key) &&
                baseIsEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
            );

            // Symbol keys
            if (result) {
              const aSymbols = Object.getOwnPropertySymbols(a as Record<string | symbol, unknown>);
              const bSymbols = Object.getOwnPropertySymbols(b as Record<string | symbol, unknown>);
              result =
                aSymbols.length === bSymbols.length &&
                aSymbols.every(
                  (sym, i) =>
                    sym === bSymbols[i] &&
                    baseIsEqual(
                      (a as Record<string | symbol, unknown>)[sym],
                      (b as Record<string | symbol, unknown>)[sym],
                    ),
                );
            }
          }
        }
      }
    } finally {
      stack.delete(a);
    }
    return result;
  }

  return baseIsEqual(value, other);
}
