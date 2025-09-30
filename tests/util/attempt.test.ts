import { attempt } from '../../src/util/attempt';

describe('attempt', () => {
  it('should return result when function succeeds', () => {
    const result = attempt(() => 'success');
    expect(result).toBe('success');
  });

  it('should return error when function throws', () => {
    const result = attempt(() => {
      throw new Error('test error');
    });
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('test error');
  });

  it('should return error when function throws string', () => {
    const result = attempt(() => {
      throw 'string error';
    });
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('string error');
  });

  it('should return error when function throws number', () => {
    const result = attempt(() => {
      throw 42;
    });
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('42');
  });

  it('should pass arguments to function', () => {
    const result = attempt((a: number, b: number) => a + b, 1, 2);
    expect(result).toBe(3);
  });

  it('should handle function that returns undefined', () => {
    const result = attempt(() => undefined);
    expect(result).toBe(undefined);
  });

  it('should handle function that returns null', () => {
    const result = attempt(() => null);
    expect(result).toBe(null);
  });

  it('should handle function that returns false', () => {
    const result = attempt(() => false);
    expect(result).toBe(false);
  });

  it('should handle function that returns zero', () => {
    const result = attempt(() => 0);
    expect(result).toBe(0);
  });

  it('should handle function that returns empty string', () => {
    const result = attempt(() => '');
    expect(result).toBe('');
  });
});
