import { partialRight } from '../../src/function/partialRight';

describe('partialRight', () => {
  it('partially applies arguments from right', () => {
    const fn = (a: string, b: string, c: string) => a + b + c;
    const partialFn = partialRight(fn, 'b', 'c');
    
    expect(partialFn('a')).toBe('abc');
  });

  it('handles no partial arguments', () => {
    const fn = (a: string, b: string) => a + b;
    const partialFn = partialRight(fn);
    
    expect(partialFn('a', 'b')).toBe('ab');
  });

  it('handles all arguments provided', () => {
    const fn = (a: string, b: string) => a + b;
    const partialFn = partialRight(fn, 'b');
    
    expect(partialFn('a')).toBe('ab');
  });

  it('handles single argument function', () => {
    const fn = (x: number) => x * 2;
    const partialFn = partialRight(fn, 5);
    
    expect(partialFn()).toBe(10);
  });

  it('handles no arguments function', () => {
    const fn = () => 'hello';
    const partialFn = partialRight(fn);
    
    expect(partialFn()).toBe('hello');
  });
});
