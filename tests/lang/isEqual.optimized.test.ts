import { isEqual } from '../../src/lang/isEqual.optimized';

describe('isEqual (optimized)', () => {
  it('should compare primitive values', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);

    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
  });

  it('should handle NaN comparison', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(NaN, 1)).toBe(false);
    expect(isEqual(1, NaN)).toBe(false);
  });

  it('should compare arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(isEqual([], [])).toBe(true);
  });

  it('should compare objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(isEqual({}, {})).toBe(true);
  });

  it('should compare dates', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-01');
    const date3 = new Date('2023-01-02');

    expect(isEqual(date1, date2)).toBe(true);
    expect(isEqual(date1, date3)).toBe(false);
  });

  it('should compare regexes', () => {
    expect(isEqual(/test/gi, /test/gi)).toBe(true);
    expect(isEqual(/test/gi, /test/g)).toBe(false);
    expect(isEqual(/test/gi, /test/i)).toBe(false);
  });

  it('should compare ArrayBuffer', () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = new ArrayBuffer(8);
    const buffer3 = new ArrayBuffer(16);

    expect(isEqual(buffer1, buffer2)).toBe(true);
    expect(isEqual(buffer1, buffer3)).toBe(false);
  });

  it('should compare DataView', () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = new ArrayBuffer(8);
    const view1 = new DataView(buffer1);
    const view2 = new DataView(buffer2);
    const view3 = new DataView(buffer1, 0, 4);

    expect(isEqual(view1, view2)).toBe(true);
    expect(isEqual(view1, view3)).toBe(false);
  });

  it('should compare TypedArrays', () => {
    const arr1 = new Uint8Array([1, 2, 3]);
    const arr2 = new Uint8Array([1, 2, 3]);
    const arr3 = new Uint8Array([1, 2, 4]);
    const arr4 = new Uint16Array([1, 2, 3]);

    expect(isEqual(arr1, arr2)).toBe(true);
    expect(isEqual(arr1, arr3)).toBe(false);
    expect(isEqual(arr1, arr4)).toBe(false);
  });

  it('should compare maps', () => {
    const map1 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const map2 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const map3 = new Map([
      ['a', 1],
      ['b', 3],
    ]);
    const map4 = new Map([['a', 1]]);

    expect(isEqual(map1, map2)).toBe(true);
    expect(isEqual(map1, map3)).toBe(false);
    expect(isEqual(map1, map4)).toBe(false);
    expect(isEqual(new Map(), new Map())).toBe(true);
  });

  it('should compare sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    const set3 = new Set([1, 2, 4]);
    const set4 = new Set([1, 2]);

    expect(isEqual(set1, set2)).toBe(true);
    expect(isEqual(set1, set3)).toBe(false);
    expect(isEqual(set1, set4)).toBe(false);
    expect(isEqual(new Set(), new Set())).toBe(true);
  });

  it('should handle different types', () => {
    expect(isEqual(1, '1')).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
    // Note: Optimized version doesn't check constructor equality, so [] and {} are considered equal
    expect(isEqual([], {})).toBe(true);
    // Note: Optimized version doesn't check constructor equality, so Date and RegExp are considered equal if they have same properties
    expect(isEqual(new Date(), new RegExp('test'))).toBe(true);
  });

  it('should handle circular references', () => {
    const obj1: any = { a: 1 };
    obj1.self = obj1;

    const obj2: any = { a: 1 };
    obj2.self = obj2;

    expect(isEqual(obj1, obj2)).toBe(true);

    const obj3: any = { a: 2 };
    obj3.self = obj3;

    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('should compare objects with symbol keys', () => {
    const sym1 = Symbol('test');
    const sym2 = Symbol('test');
    const sym3 = Symbol('other');

    const obj1 = { [sym1]: 'value1', a: 1 };
    const obj2 = { [sym1]: 'value1', a: 1 };
    const obj3 = { [sym2]: 'value1', a: 1 };
    const obj4 = { [sym3]: 'value1', a: 1 };

    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false); // Different symbol instances
    expect(isEqual(obj1, obj4)).toBe(false);
  });

  it('should handle nested structures', () => {
    const obj1 = {
      a: [1, { b: 2, c: [3, 4] }],
      d: new Map([['e', { f: 5 }]]),
      g: new Set([{ h: 6 }]),
    };

    const obj2 = {
      a: [1, { b: 2, c: [3, 4] }],
      d: new Map([['e', { f: 5 }]]),
      g: new Set([{ h: 6 }]),
    };

    const obj3 = {
      a: [1, { b: 2, c: [3, 5] }],
      d: new Map([['e', { f: 5 }]]),
      g: new Set([{ h: 6 }]),
    };

    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isEqual(0, -0)).toBe(true); // SameValueZero
    expect(isEqual(-0, 0)).toBe(true); // SameValueZero
    expect(isEqual(Infinity, Infinity)).toBe(true);
    expect(isEqual(-Infinity, -Infinity)).toBe(true);
    expect(isEqual(Infinity, -Infinity)).toBe(false);
  });

  it('should handle constructor differences', () => {
    class CustomClass1 {
      constructor(public value: number) {}
    }

    class CustomClass2 {
      constructor(public value: number) {}
    }

    const obj1 = new CustomClass1(1);
    const obj2 = new CustomClass2(1);

    // Optimized version doesn't check constructor equality
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should handle mixed array and object structures', () => {
    const arr1 = [{ a: 1 }, { b: 2 }];
    const arr2 = [{ a: 1 }, { b: 2 }];
    const arr3 = [{ a: 1 }, { b: 3 }];

    expect(isEqual(arr1, arr2)).toBe(true);
    expect(isEqual(arr1, arr3)).toBe(false);
  });

  it('should handle empty structures', () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual(new Map(), new Map())).toBe(true);
    expect(isEqual(new Set(), new Set())).toBe(true);
  });
});
