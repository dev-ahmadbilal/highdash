import { rangeRight } from '../../src/util/rangeRight';

describe('rangeRight', () => {
  it('should create array of numbers in descending order', () => {
    expect(rangeRight(4)).toEqual([3, 2, 1, 0]);
  });

  it('should work with start and end', () => {
    expect(rangeRight(1, 5)).toEqual([4, 3, 2, 1]);
  });

  it('should work with start, end, and step', () => {
    expect(rangeRight(1, 10, 2)).toEqual([9, 7, 5, 3, 1]);
  });

  it('should work with negative step', () => {
    expect(rangeRight(5, 1, -1)).toEqual([2, 3, 4, 5]);
  });

  it('should work with decimal step', () => {
    expect(rangeRight(0, 5, 0.5)).toEqual([4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0]);
  });

  it('should work with negative start and end', () => {
    expect(rangeRight(-3, 0)).toEqual([-1, -2, -3]);
  });

  it('should work with start greater than end', () => {
    expect(rangeRight(5, 1)).toEqual([]);
  });

  it('should work with zero step', () => {
    expect(rangeRight(1, 5, 0)).toEqual([]);
  });

  it('should work with single argument', () => {
    expect(rangeRight(3)).toEqual([2, 1, 0]);
  });

  it('should work with no arguments', () => {
    expect(rangeRight()).toEqual([]);
  });

  it('should work with large numbers', () => {
    const result = rangeRight(1000, 1005);
    expect(result).toEqual([1004, 1003, 1002, 1001, 1000]);
  });

  it('should work with step larger than range', () => {
    expect(rangeRight(1, 5, 10)).toEqual([]);
  });

  it('should work with negative step larger than range', () => {
    expect(rangeRight(5, 1, -10)).toEqual([]);
  });
});
