import { flip } from '../../src/function/flip';

describe('flip', () => {
  it('flips first two arguments', () => {
    const fn = (a: string, b: string) => a + b;
    const flipped = flip(fn);
    
    expect(flipped('a', 'b')).toBe('ba');
  });

  it('handles single argument', () => {
    const fn = (x: number) => x * 2;
    const flipped = flip(fn);
    
    expect(flipped(5)).toBe(10);
  });

  it('handles no arguments', () => {
    const fn = () => 'hello';
    const flipped = flip(fn);
    
    expect(flipped()).toBe('hello');
  });

  it('handles more than two arguments', () => {
    const fn = (a: string, b: string, c: string) => a + b + c;
    const flipped = flip(fn);
    
    expect(flipped('a', 'b', 'c')).toBe('bac');
  });
});
