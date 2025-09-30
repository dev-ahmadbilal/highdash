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
  const stackA: unknown[] = [];
  const stackB: unknown[] = [];

  function sameValueZero(a: unknown, b: unknown): boolean {
    return a === b || (a !== a && b !== b);
  }

  function isTypedArray(
    obj: unknown,
  ): obj is
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | BigInt64Array
    | BigUint64Array {
    return ArrayBuffer.isView(obj) && !(obj instanceof DataView);
  }

  function equalArrays(a: unknown[], b: unknown[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!baseIsEqual(a[i], b[i])) return false;
    }
    return true;
  }

  function equalArrayBuffer(a: ArrayBufferLike, b: ArrayBufferLike): boolean {
    if (a.byteLength !== b.byteLength) return false;
    const va = new Uint8Array(a);
    const vb = new Uint8Array(b);
    for (let i = 0; i < va.length; i++) {
      if (va[i] !== vb[i]) return false;
    }
    return true;
  }

  function equalDataView(a: DataView, b: DataView): boolean {
    if (a.byteLength !== b.byteLength) return false;
    return equalArrayBuffer(a.buffer, b.buffer);
  }

  function equalTypedArrays(a: ArrayBufferView, b: ArrayBufferView): boolean {
    if (a.constructor !== b.constructor) return false;
    if ((a as any).length !== (b as any).length) return false;
    const len = (a as any).length as number;
    for (let i = 0; i < len; i++) {
      if (!sameValueZero((a as any)[i], (b as any)[i])) return false;
    }
    return true;
  }

  function equalSets(a: Set<unknown>, b: Set<unknown>): boolean {
    if (a.size !== b.size) return false;
    // Unordered deep equality: every aVal must have a match in b
    const used: boolean[] = new Array(b.size).fill(false);
    const bValues = Array.from(b.values());
    outer: for (const aVal of a.values()) {
      for (let i = 0; i < bValues.length; i++) {
        if (used[i]) continue;
        if (baseIsEqual(aVal, bValues[i])) {
          used[i] = true;
          continue outer;
        }
      }
      return false;
    }
    return true;
  }

  function equalMaps(a: Map<unknown, unknown>, b: Map<unknown, unknown>): boolean {
    if (a.size !== b.size) return false;
    const used: boolean[] = new Array(b.size).fill(false);
    const bEntries = Array.from(b.entries());
    outer: for (const [ak, av] of a.entries()) {
      for (let i = 0; i < bEntries.length; i++) {
        if (used[i]) continue;
        const [bk, bv] = bEntries[i];
        if (baseIsEqual(ak, bk) && baseIsEqual(av, bv)) {
          used[i] = true;
          continue outer;
        }
      }
      return false;
    }
    return true;
  }

  function hasOwn(obj: object, key: string | symbol): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function equalObjects(a: Record<string | symbol, unknown>, b: Record<string | symbol, unknown>): boolean {
    // Compare string keys
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
      if (!hasOwn(b, key) || !baseIsEqual(a[key], b[key])) return false;
    }

    // Compare enumerable symbol keys
    const aSyms = Object.getOwnPropertySymbols(a).filter((s) => {
      const d = Object.getOwnPropertyDescriptor(a, s);
      return !!d && d.enumerable === true;
    });
    const bSyms = Object.getOwnPropertySymbols(b).filter((s) => {
      const d = Object.getOwnPropertyDescriptor(b, s);
      return !!d && d.enumerable === true;
    });
    if (aSyms.length !== bSyms.length) return false;
    for (const s of aSyms) {
      if (!hasOwn(b, s) || !baseIsEqual(a[s], b[s])) return false;
    }
    return true;
  }

  function baseIsEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a === null || b === null || a === undefined || b === undefined) return a === b;
    const typeA = typeof a;
    const typeB = typeof b;
    if (typeA !== typeB) return false;
    if (typeA !== 'object') return sameValueZero(a, b);

    // Cycle detection
    const idx = stackA.indexOf(a);
    if (idx !== -1) {
      return stackB[idx] === b;
    }
    stackA.push(a);
    stackB.push(b);

    try {
      // Arrays
      if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) return false;
        return equalArrays(a as unknown[], b as unknown[]);
      }

      // Dates
      if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      }

      // RegExp
      if (a instanceof RegExp && b instanceof RegExp) {
        return a.toString() === b.toString();
      }

      // ArrayBuffer
      if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
        return equalArrayBuffer(a, b);
      }

      // DataView
      if (a instanceof DataView && b instanceof DataView) {
        return equalDataView(a, b);
      }

      // TypedArrays
      if (isTypedArray(a) && isTypedArray(b)) {
        return equalTypedArrays(a as unknown as ArrayBufferView, b as unknown as ArrayBufferView);
      }

      // Map
      if (a instanceof Map && b instanceof Map) {
        return equalMaps(a, b);
      }

      // Set
      if (a instanceof Set && b instanceof Set) {
        return equalSets(a, b);
      }

      // Functions are only equal by reference
      if (typeof a === 'function' || typeof b === 'function') {
        return false;
      }

      // Plain/other objects (compare own enumerable string and symbol keys)
      return equalObjects(a as Record<string | symbol, unknown>, b as Record<string | symbol, unknown>);
    } finally {
      stackA.pop();
      stackB.pop();
    }
  }

  return baseIsEqual(value, other);
}
