import { lowerFirst } from '../../src/string/lowerFirst';

describe('lowerFirst', () => {
  it('should convert first character to lower case', () => {
    expect(lowerFirst('Fred')).toBe('fred');
  });

  it('should handle already lower case first character', () => {
    expect(lowerFirst('fred')).toBe('fred');
  });

  it('should handle single character', () => {
    expect(lowerFirst('F')).toBe('f');
    expect(lowerFirst('f')).toBe('f');
  });

  it('should handle empty string', () => {
    expect(lowerFirst('')).toBe('');
  });

  it('should handle strings with spaces', () => {
    expect(lowerFirst('FRED')).toBe('fRED');
  });

  it('should handle strings with special characters', () => {
    expect(lowerFirst('FRED!')).toBe('fRED!');
    expect(lowerFirst('FRED-')).toBe('fRED-');
  });

  it('should handle strings with numbers', () => {
    expect(lowerFirst('FRED123')).toBe('fRED123');
  });

  it('should handle mixed case strings', () => {
    expect(lowerFirst('FrEd')).toBe('frEd');
  });

  it('should handle non-alphabetic first character', () => {
    expect(lowerFirst('123Fred')).toBe('123Fred');
    expect(lowerFirst('!Fred')).toBe('!Fred');
  });

  it('should handle unicode characters', () => {
    expect(lowerFirst('ÑOÑO')).toBe('ñOÑO');
  });
});
