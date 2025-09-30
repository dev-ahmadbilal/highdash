import { isError } from '../../src/lang/isError';

describe('isError', () => {
  it('should return true for Error objects', () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new Error('test'))).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError(new ReferenceError())).toBe(true);
    expect(isError(new SyntaxError())).toBe(true);
    expect(isError(new RangeError())).toBe(true);
    expect(isError(new EvalError())).toBe(true);
    expect(isError(new URIError())).toBe(true);
  });

  it('should return false for non-Error objects', () => {
    expect(isError(Error)).toBe(false);
    expect(isError({})).toBe(false);
    expect(isError([])).toBe(false);
    expect(isError('abc')).toBe(false);
    expect(isError(1)).toBe(false);
    expect(isError(true)).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
    expect(isError(() => {})).toBe(false);
  });
});
