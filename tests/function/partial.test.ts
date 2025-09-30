import { partial } from '../../src/function/partial';

describe('partial', () => {
  it('partially applies arguments', () => {
    const fn = (a: string, b: string, c: string) => a + b + c;
    const partialFn = partial(fn, 'a', 'b');
    
    expect(partialFn('c')).toBe('abc');
  });

  it('handles no partial arguments', () => {
    const fn = (a: string, b: string) => a + b;
    const partialFn = partial(fn);
    
    expect(partialFn('a', 'b')).toBe('ab');
  });

  it('handles all arguments provided', () => {
    const fn = (a: string, b: string) => a + b;
    const partialFn = partial(fn, 'a', 'b');
    
    expect(partialFn()).toBe('ab');
  });

  it('handles single argument function', () => {
    const fn = (x: number) => x * 2;
    const partialFn = partial(fn, 5);
    
    expect(partialFn()).toBe(10);
  });

  it('handles no arguments function', () => {
    const fn = () => 'hello';
    const partialFn = partial(fn);
    
    expect(partialFn()).toBe('hello');
  });
});
