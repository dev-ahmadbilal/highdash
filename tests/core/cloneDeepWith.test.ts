import { cloneDeepWith } from '../../src/core/cloneDeepWith';

describe('cloneDeepWith', () => {
  it('uses customizer when provided', () => {
    const customizer = (value: unknown) => {
      if (typeof value === 'number') return (value as number) * 2;
      return undefined;
    };
    const obj = { a: 1, b: { c: 2 } };
    const cloned = cloneDeepWith(obj, customizer);
    expect(cloned).toEqual({ a: 2, b: { c: 4 } });
    expect(cloned).not.toBe(obj);
    expect((cloned as any).b).not.toBe((obj as any).b);
  });

  it('falls back to deep clone when customizer returns undefined', () => {
    const obj = { a: { b: 1 } };
    const cloned = cloneDeepWith(obj, () => undefined);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect((cloned as any).a).not.toBe((obj as any).a);
  });

  it('clones arrays, maps, and sets with customizer support', () => {
    const customizer = (v: unknown) => (typeof v === 'number' ? (v as number) + 1 : undefined);
    const arr = [1, { x: 2 }];
    const map = new Map<any, any>([[{ k: 1 }, 2]]);
    const set = new Set<any>([1, { y: 2 }]);
    const clonedArr = cloneDeepWith(arr, customizer);
    const clonedMap = cloneDeepWith(map, customizer);
    const clonedSet = cloneDeepWith(set, customizer);
    expect(clonedArr).toEqual([2, { x: 3 }]);
    expect(clonedMap.size).toBe(1);
    const entries = Array.from(clonedMap.entries()) as [Record<string, unknown>, unknown][];
    const [k, v] = entries[0];
    expect(v).toBe(3);
    expect(k).toEqual({ k: 2 });
    expect(clonedSet.has(2)).toBe(true);
    expect(Array.from(clonedSet).some((item) => typeof item === 'object' && (item as any).y === 3)).toBe(true);
  });

  it('supports circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const cloned = cloneDeepWith(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.self).toBe(cloned);
  });

  it('clones ArrayBuffer', () => {
    const buffer = new ArrayBuffer(8);
    const view = new Uint8Array(buffer);
    view[0] = 1;
    view[1] = 2;

    const cloned = cloneDeepWith(buffer);
    expect(cloned).not.toBe(buffer);
    expect(cloned).toBeInstanceOf(ArrayBuffer);
    expect(cloned.byteLength).toBe(8);

    const clonedView = new Uint8Array(cloned);
    expect(clonedView[0]).toBe(1);
    expect(clonedView[1]).toBe(2);
  });

  it('clones DataView', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setUint8(0, 42);

    const cloned = cloneDeepWith(view);
    expect(cloned).not.toBe(view);
    expect(cloned).toBeInstanceOf(DataView);
    expect(cloned.byteLength).toBe(8);
    expect(cloned.byteOffset).toBe(0);
    expect(cloned.getUint8(0)).toBe(42);
  });

  it('clones DataView through ArrayBuffer.isView', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer, 2, 4);
    view.setUint8(0, 100);

    const cloned = cloneDeepWith(view);
    expect(cloned).not.toBe(view);
    expect(cloned).toBeInstanceOf(DataView);
    expect(cloned.byteLength).toBe(4);
    expect(cloned.byteOffset).toBe(2);
    expect(cloned.getUint8(0)).toBe(100);
  });

  it('clones TypedArrays', () => {
    const typedArray = new Uint8Array([1, 2, 3, 4]);
    const cloned = cloneDeepWith(typedArray);

    expect(cloned).not.toBe(typedArray);
    expect(cloned).toBeInstanceOf(Uint8Array);
    expect(cloned.length).toBe(4);
    expect(Array.from(cloned)).toEqual([1, 2, 3, 4]);
  });

  it('handles symbol properties correctly', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj: any = { a: 1 };

    // Add enumerable symbol
    obj[sym1] = 'enumerable';

    // Add non-enumerable symbol
    Object.defineProperty(obj, sym2, {
      value: 'non-enumerable',
      enumerable: false,
    });

    const cloned = cloneDeepWith(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned[sym1]).toBe('enumerable');
    expect(cloned[sym2]).toBeUndefined(); // Non-enumerable symbols are not copied
  });

  it('handles customizer with all parameters', () => {
    const customizer = (
      value: unknown,
      _key: string | number | symbol | undefined,
      _object: unknown,
      _stack: Map<any, any>,
    ) => {
      if (typeof value === 'string' && value === 'special') {
        return 'customized';
      }
      return undefined;
    };

    const obj = { special: 'special', normal: 'value' };
    const cloned = cloneDeepWith(obj, customizer);

    expect(cloned).toEqual({ special: 'customized', normal: 'value' });
  });

  it('handles nested complex structures', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    const typedArray = new Uint8Array([1, 2]);

    const obj = {
      buffer,
      view,
      typedArray,
      map: new Map([['key', buffer]]),
      set: new Set([view, typedArray]),
    };

    const cloned = cloneDeepWith(obj);

    expect(cloned).not.toBe(obj);
    expect(cloned.buffer).not.toBe(buffer);
    expect(cloned.view).not.toBe(view);
    expect(cloned.typedArray).not.toBe(typedArray);
    expect(cloned.map).not.toBe(obj.map);
    expect(cloned.set).not.toBe(obj.set);

    expect(cloned.buffer).toBeInstanceOf(ArrayBuffer);
    expect(cloned.view).toBeInstanceOf(DataView);
    expect(cloned.typedArray).toBeInstanceOf(Uint8Array);
    expect(cloned.map).toBeInstanceOf(Map);
    expect(cloned.set).toBeInstanceOf(Set);
  });
});
