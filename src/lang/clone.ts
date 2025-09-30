/**
 * Creates a shallow clone of `value`.
 *
 * @param value - The value to clone
 * @returns Returns the cloned value
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'b': 2 }];
 * const shallow = clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 * ```
 */
export function clone<T>(value: T): T {
  const seen = new Map<any, any>();

  function baseClone<V>(input: V): V {
    if (input === null || typeof input !== 'object') {
      return input;
    }

    if (seen.has(input)) {
      return seen.get(input);
    }

    // Date
    if (input instanceof Date) {
      return new Date(input.getTime()) as unknown as V;
    }

    // RegExp
    if (input instanceof RegExp) {
      return new RegExp(input.source, input.flags) as unknown as V;
    }

    // ArrayBuffer
    if (input instanceof ArrayBuffer) {
      const cloned = input.slice(0);
      return cloned as unknown as V;
    }

    // Typed Arrays
    if (ArrayBuffer.isView(input)) {
      // DataView
      if (input instanceof DataView) {
        const buffer = baseClone(input.buffer);
        const cloned = new DataView(buffer, input.byteOffset, input.byteLength);
        return cloned as unknown as V;
      }
      // e.g., Uint8Array, Int16Array, Float32Array, etc.
      const ctor = (input as any).constructor as {
        new (buffer: ArrayBufferLike, byteOffset: number, length: number): any;
      };
      const clonedBuffer = baseClone((input as any).buffer);
      const cloned = new ctor(clonedBuffer, (input as any).byteOffset, (input as any).length);
      return cloned as unknown as V;
    }

    // Array
    if (Array.isArray(input)) {
      const arr: any[] = new Array((input as any).length);
      seen.set(input, arr);
      for (let i = 0; i < (input as any).length; i++) {
        arr[i] = baseClone((input as any)[i]);
      }
      return arr as unknown as V;
    }

    // Map
    if (input instanceof Map) {
      const result = new Map();
      seen.set(input, result);
      for (const [k, v] of input) {
        result.set(baseClone(k), baseClone(v));
      }
      return result as unknown as V;
    }

    // Set
    if (input instanceof Set) {
      const result = new Set();
      seen.set(input, result);
      for (const v of input) {
        result.add(baseClone(v));
      }
      return result as unknown as V;
    }

    // WeakMap
    if (typeof WeakMap !== 'undefined' && input instanceof WeakMap) {
      const result = new WeakMap();
      seen.set(input, result);
      // Cannot iterate entries of WeakMap; best effort is to return new WeakMap()
      return result as unknown as V;
    }

    // WeakSet
    if (typeof WeakSet !== 'undefined' && input instanceof WeakSet) {
      const result = new WeakSet();
      seen.set(input, result);
      // Cannot iterate entries of WeakSet; best effort is to return new WeakSet()
      return result as unknown as V;
    }

    // Plain objects and class instances
    const proto = Object.getPrototypeOf(input);
    const output: any = Object.create(proto);
    seen.set(input, output);
    for (const key of Object.keys(input as any)) {
      output[key] = baseClone((input as any)[key]);
    }
    return output as V;
  }

  return baseClone(value);
}
