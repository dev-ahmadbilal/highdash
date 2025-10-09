import { transform } from '../../src/object/transform';

describe('transform', () => {
  it('transforms object properties', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = transform(
      object,
      (result: any, value: number, key: string) => {
        result[key + '2'] = value * 2;
      },
      {},
    );
    expect(result).toEqual({ a2: 2, b2: 4, c2: 6 });
  });

  it('transforms array elements', () => {
    const array = [1, 2, 3];
    const result = transform(
      array,
      (result: any, value: number, _index: number) => {
        result[_index] = value * 2;
      },
      [],
    );
    expect(result).toEqual([2, 4, 6]);
  });

  it('handles empty object', () => {
    const result = transform(
      {},
      (result: any, value: any, key: string) => {
        result[key] = value;
      },
      {},
    );
    expect(result).toEqual({});
  });

  it('handles empty array', () => {
    const result = transform(
      [],
      (result: any, value: any, index: number) => {
        result[index] = value;
      },
      [],
    );
    expect(result).toEqual([]);
  });

  it('handles null input', () => {
    const result = transform(
      null,
      (result: any, value: any, key: string) => {
        result[key] = value;
      },
      {},
    );
    expect(result).toEqual({});
  });

  it('handles undefined input', () => {
    const result = transform(
      undefined,
      (result: any, value: any, key: string) => {
        result[key] = value;
      },
      {},
    );
    expect(result).toEqual({});
  });

  it('uses default accumulator for arrays', () => {
    const array = [1, 2, 3];
    const result = transform(array, (result: any, value: number, _index: number) => {
      result.push(value * 2);
    });
    expect(result).toEqual([2, 4, 6]);
  });

  it('uses default accumulator for objects', () => {
    const object = { a: 1, b: 2 };
    const result = transform(object, (result: any, value: number, key: string) => {
      result[key] = value * 2;
    });
    expect(result).toEqual({ a: 2, b: 4 });
  });

  it('stops iteration when iteratee returns false (array)', () => {
    const array = [1, 2, 3, 4, 5];
    const result = transform(
      array,
      (result: any, value: number, _index: number) => {
        result.push(value);
        return value < 3; // Stop when value >= 3
      },
      [],
    );
    expect(result).toEqual([1, 2, 3]); // Includes the value that caused the stop
  });

  it('stops iteration when iteratee returns false (object)', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const result = transform(
      object,
      (result: any, value: number, key: string) => {
        result[key] = value;
        return value < 3; // Stop when value >= 3
      },
      {},
    );
    expect(result).toEqual({ a: 1, b: 2, c: 3 }); // Includes the value that caused the stop
  });

  it('updates result when iteratee returns new object (array)', () => {
    const array = [1, 2, 3];
    const result = transform(
      array,
      (result: any, value: number, _index: number) => {
        // Don't mutate result, just return new object
        return { sum: (result.sum || 0) + value };
      },
      [],
    );
    expect(result).toEqual({ sum: 6 });
  });

  it('updates result when iteratee returns new object (object)', () => {
    const object = { a: 1, b: 2 };
    const result = transform(
      object,
      (result: any, value: number, key: string) => {
        result[key] = value;
        return { count: Object.keys(result).length }; // Return new object
      },
      {},
    );
    expect(result).toEqual({ count: 2 });
  });

  it('continues iteration when iteratee returns true', () => {
    const array = [1, 2, 3];
    const result = transform(
      array,
      (result: any, value: number, _index: number) => {
        result.push(value);
        return true; // Continue iteration
      },
      [],
    );
    expect(result).toEqual([1, 2, 3]);
  });

  it('continues iteration when iteratee returns undefined', () => {
    const object = { a: 1, b: 2 };
    const result = transform(
      object,
      (result: any, value: number, key: string) => {
        result[key] = value;
        return undefined; // Continue iteration
      },
      {},
    );
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('handles complex transformation with early termination', () => {
    const array = [1, 2, 3, 4, 5];
    const result = transform(
      array,
      (result: any, value: number, _index: number) => {
        if (value % 2 === 0) {
          result.even = (result.even || 0) + 1;
        } else {
          result.odd = (result.odd || 0) + 1;
        }
        return value < 4; // Stop when value >= 4
      },
      {},
    );
    expect(result).toEqual({ even: 2, odd: 2 }); // Includes the value that caused the stop
  });
});
