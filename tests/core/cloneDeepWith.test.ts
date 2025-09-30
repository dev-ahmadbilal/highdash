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
});
