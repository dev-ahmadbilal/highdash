import { before } from '../../src/function/before';

describe('before', () => {
  it('calls function only before n times', () => {
    let count = 0;
    const fn = before(3, () => ++count);
    
    expect(fn()).toBe(1);
    expect(fn()).toBe(2);
    expect(fn()).toBe(2);
    expect(fn()).toBe(2);
  });

  it('handles n = 0', () => {
    let count = 0;
    const fn = before(0, () => ++count);
    
    expect(fn()).toBeUndefined();
    expect(fn()).toBeUndefined();
  });

  it('handles n = 1', () => {
    let count = 0;
    const fn = before(1, () => ++count);
    
    expect(fn()).toBe(1);
    expect(fn()).toBeUndefined();
  });

  it('passes arguments correctly', () => {
    const fn = before(2, (x: number, y: number) => x + y);
    
    expect(fn(1, 2)).toBe(3);
    expect(fn(3, 4)).toBe(3); // returns cached result
  });
});
