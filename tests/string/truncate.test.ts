import { truncate } from '../../src/string/truncate';

describe('truncate', () => {
  it('should truncate string with default options', () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe('hi-diddly-ho there, neighbo...');
  });

  it('should truncate with custom length', () => {
    expect(truncate('hi-diddly-ho there, neighborino', { length: 24 })).toBe('hi-diddly-ho there, n...');
  });

  it('should truncate with custom omission', () => {
    expect(truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' })).toBe('hi-diddly-ho there, neig [...]');
  });

  it('should truncate at separator', () => {
    expect(truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' })).toBe('hi-diddly-ho there,...');
  });

  it('should truncate at regex separator', () => {
    expect(truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ })).toBe(
      'hi-diddly-ho there...',
    );
  });

  it('should handle short strings', () => {
    expect(truncate('hello', { length: 10 })).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(truncate('')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(truncate(null as any)).toBe('');
  });

  it('should handle very short length', () => {
    expect(truncate('hello', { length: 2 })).toBe('...');
  });
});
