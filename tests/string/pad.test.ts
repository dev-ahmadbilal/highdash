import { pad } from '../../src/string/pad';

describe('pad', () => {
  it('should pad string to specified length', () => {
    expect(pad('abc', 8)).toBe('   abc  ');
  });

  it('should pad string with custom characters', () => {
    expect(pad('abc', 8, '_-')).toBe('_-_abc_-');
  });

  it('should pad string with single character', () => {
    expect(pad('abc', 8, '0')).toBe('000abc00');
  });

  it('should pad string with multiple characters', () => {
    expect(pad('abc', 8, 'xyz')).toBe('xyzabcxy');
  });

  it('should pad string with longer character string', () => {
    expect(pad('abc', 8, '12345')).toBe('123abc12');
  });

  it('should pad string with shorter character string', () => {
    expect(pad('abc', 8, 'x')).toBe('xxxabcxx');
  });

  it('should pad string with empty character string', () => {
    expect(pad('abc', 8, '')).toBe('   abc  ');
  });

  it('should pad string with spaces by default', () => {
    expect(pad('abc', 8)).toBe('   abc  ');
  });

  it('should pad string with spaces when no character specified', () => {
    expect(pad('abc', 8, undefined)).toBe('   abc  ');
  });

  it('should pad string with spaces when null character specified', () => {
    expect(pad('abc', 8, null)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is not string', () => {
    expect(pad('abc', 8, 123)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is object', () => {
    expect(pad('abc', 8, {})).toBe('   abc  ');
  });

  it('should pad string with spaces when character is array', () => {
    expect(pad('abc', 8, [])).toBe('   abc  ');
  });

  it('should pad string with spaces when character is function', () => {
    expect(pad('abc', 8, () => {})).toBe('   abc  ');
  });

  it('should pad string with spaces when character is boolean', () => {
    expect(pad('abc', 8, true)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is number', () => {
    expect(pad('abc', 8, 123)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is date', () => {
    expect(pad('abc', 8, new Date())).toBe('   abc  ');
  });

  it('should pad string with spaces when character is regex', () => {
    expect(pad('abc', 8, /abc/)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is symbol', () => {
    expect(pad('abc', 8, Symbol('test'))).toBe('   abc  ');
  });

  it('should pad string with spaces when character is bigint', () => {
    expect(pad('abc', 8, BigInt(123))).toBe('   abc  ');
  });

  it('should pad string with spaces when character is undefined', () => {
    expect(pad('abc', 8, undefined)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is null', () => {
    expect(pad('abc', 8, null)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is NaN', () => {
    expect(pad('abc', 8, NaN)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is Infinity', () => {
    expect(pad('abc', 8, Infinity)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is -Infinity', () => {
    expect(pad('abc', 8, -Infinity)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is 0', () => {
    expect(pad('abc', 8, 0)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is -0', () => {
    expect(pad('abc', 8, -0)).toBe('   abc  ');
  });

  it('should pad string with spaces when character is empty string', () => {
    expect(pad('abc', 8, '')).toBe('   abc  ');
  });

  it('should pad string with spaces when character is whitespace', () => {
    expect(pad('abc', 8, ' ')).toBe('   abc  ');
  });

  it('should pad string with spaces when character is tab', () => {
    expect(pad('abc', 8, '\t')).toBe('\t\t\tabc\t\t');
  });

  it('should pad string with spaces when character is newline', () => {
    expect(pad('abc', 8, '\n')).toBe('\n\n\nabc\n\n');
  });

  it('should pad string with spaces when character is carriage return', () => {
    expect(pad('abc', 8, '\r')).toBe('\r\r\rabc\r\r');
  });

  it('should pad string with spaces when character is form feed', () => {
    expect(pad('abc', 8, '\f')).toBe('\f\f\fabc\f\f');
  });

  it('should pad string with spaces when character is vertical tab', () => {
    expect(pad('abc', 8, '\v')).toBe('\v\v\vabc\v\v');
  });

  it('should pad string with spaces when character is backspace', () => {
    expect(pad('abc', 8, '\b')).toBe('\b\b\babc\b\b');
  });

  it('should pad string with spaces when character is null character', () => {
    expect(pad('abc', 8, '\0')).toBe('\0\0\0abc\0\0');
  });

  it('should pad string with spaces when character is unicode', () => {
    expect(pad('abc', 8, '🚀')).toBe('🚀🚀🚀abc🚀🚀');
  });

  it('should pad string with spaces when character is emoji', () => {
    expect(pad('abc', 8, '😀')).toBe('😀😀😀abc😀😀');
  });

  it('should pad string with spaces when character is special characters', () => {
    expect(pad('abc', 8, '!@#$%')).toBe('!@#abc!@');
  });

  it('should pad string with spaces when character is mixed characters', () => {
    expect(pad('abc', 8, 'a1B2')).toBe('a1Babca1');
  });

  it('should pad string with spaces when character is very long string', () => {
    expect(pad('abc', 8, 'abcdefghijklmnopqrstuvwxyz')).toBe('abcabcab');
  });

  it('should pad string with spaces when character is very short string', () => {
    expect(pad('abc', 8, 'x')).toBe('xxxabcxx');
  });

  it('should pad string with spaces when character is single character', () => {
    expect(pad('abc', 8, 'x')).toBe('xxxabcxx');
  });

  it('should pad string with spaces when character is two characters', () => {
    expect(pad('abc', 8, 'xy')).toBe('xyxabcxy');
  });

  it('should pad string with spaces when character is three characters', () => {
    expect(pad('abc', 8, 'xyz')).toBe('xyzabcxy');
  });

  it('should pad string with spaces when character is four characters', () => {
    expect(pad('abc', 8, 'wxyz')).toBe('wxyabcwx');
  });

  it('should pad string with spaces when character is five characters', () => {
    expect(pad('abc', 8, 'vwxyz')).toBe('vwxabcvw');
  });

  it('should pad string with spaces when character is six characters', () => {
    expect(pad('abc', 8, 'uvwxyz')).toBe('uvwabcuv');
  });

  it('should pad string with spaces when character is seven characters', () => {
    expect(pad('abc', 8, 'tuvwxyz')).toBe('tuvabctu');
  });

  it('should pad string with spaces when character is eight characters', () => {
    expect(pad('abc', 8, 'stuvwxyz')).toBe('stuabcst');
  });

  it('should pad string with spaces when character is nine characters', () => {
    expect(pad('abc', 8, 'rstuvwxyz')).toBe('rstabcrs');
  });

  it('should pad string with spaces when character is ten characters', () => {
    expect(pad('abc', 8, 'qrstuvwxyz')).toBe('qrsabcqr');
  });
});
