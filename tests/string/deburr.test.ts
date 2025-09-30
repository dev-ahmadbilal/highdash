import { deburr } from '../../src/string/deburr';

describe('deburr', () => {
  it('should remove diacritical marks from letters', () => {
    expect(deburr('déjà vu')).toBe('deja vu');
  });

  it('should handle various accented characters', () => {
    expect(deburr('café')).toBe('cafe');
    expect(deburr('naïve')).toBe('naive');
    expect(deburr('résumé')).toBe('resume');
  });

  it('should handle uppercase accented characters', () => {
    expect(deburr('DÉJÀ VU')).toBe('DEJA VU');
    expect(deburr('CAFÉ')).toBe('CAFE');
    expect(deburr('NAÏVE')).toBe('NAIVE');
  });

  it('should handle mixed case accented characters', () => {
    expect(deburr('Déjà Vu')).toBe('Deja Vu');
    expect(deburr('Café')).toBe('Cafe');
    expect(deburr('Naïve')).toBe('Naive');
  });

  it('should handle various diacritical marks', () => {
    expect(deburr('àáâãäåāăą')).toBe('aaaaaaaaa');
    expect(deburr('èéêëēėę')).toBe('eeeeeee');
    expect(deburr('ìíîïīįı')).toBe('iiiiiii');
    expect(deburr('òóôõöøōő')).toBe('oooooooo');
    expect(deburr('ùúûüūůű')).toBe('uuuuuuu');
  });

  it('should handle uppercase diacritical marks', () => {
    expect(deburr('ÀÁÂÃÄÅĀĂĄ')).toBe('AAAAAAAAA');
    expect(deburr('ÈÉÊËĒĖĘ')).toBe('EEEEEEE');
    expect(deburr('ÌÍÎÏĪĮI')).toBe('IIIIIII');
    expect(deburr('ÒÓÔÕÖØŌŐ')).toBe('OOOOOOOO');
    expect(deburr('ÙÚÛÜŪŮŰ')).toBe('UUUUUUU');
  });

  it('should handle mixed diacritical marks', () => {
    expect(deburr('ÀáÂãÄåĀăĄ')).toBe('AaAaAaAaA');
    expect(deburr('ÈéÊëĒėĘ')).toBe('EeEeEeE');
    expect(deburr('ÌíÎïĪįI')).toBe('IiIiIiI');
    expect(deburr('ÒóÔõÖøŌő')).toBe('OoOoOoOo');
    expect(deburr('ÙúÛüŪůŰ')).toBe('UuUuUuU');
  });

  it('should handle special characters', () => {
    expect(deburr('ñ')).toBe('n');
    expect(deburr('Ñ')).toBe('N');
    expect(deburr('ç')).toBe('c');
    expect(deburr('Ç')).toBe('C');
  });

  it('should handle empty string', () => {
    expect(deburr('')).toBe('');
  });

  it('should handle string without diacritical marks', () => {
    expect(deburr('hello world')).toBe('hello world');
  });

  it('should handle string with numbers', () => {
    expect(deburr('café123')).toBe('cafe123');
  });

  it('should handle string with special characters', () => {
    expect(deburr('café@world')).toBe('cafe@world');
  });

  it('should handle string with spaces', () => {
    expect(deburr('café world')).toBe('cafe world');
  });

  it('should handle string with punctuation', () => {
    expect(deburr('café, world!')).toBe('cafe, world!');
  });

  it('should handle string with mixed content', () => {
    expect(deburr('café123@world!')).toBe('cafe123@world!');
  });

  it('should handle string with multiple words', () => {
    expect(deburr('café naïve résumé')).toBe('cafe naive resume');
  });

  it('should handle string with multiple lines', () => {
    expect(deburr('café\nnaïve\nrésumé')).toBe('cafe\nnaive\nresume');
  });

  it('should handle string with tabs', () => {
    expect(deburr('café\tnaïve\trésumé')).toBe('cafe\tnaive\tresume');
  });

  it('should handle string with carriage returns', () => {
    expect(deburr('café\rnaïve\rrésumé')).toBe('cafe\rnaive\rresume');
  });

  it('should handle string with form feeds', () => {
    expect(deburr('café\fnaïve\frésumé')).toBe('cafe\fnaive\fresume');
  });

  it('should handle string with vertical tabs', () => {
    expect(deburr('café\vnaïve\vrésumé')).toBe('cafe\vnaive\vresume');
  });

  it('should handle string with backspaces', () => {
    expect(deburr('café\bnaïve\brésumé')).toBe('cafe\bnaive\bresume');
  });

  it('should handle string with null characters', () => {
    expect(deburr('café\0naïve\0résumé')).toBe('cafe\0naive\0resume');
  });

  it('should handle string with unicode characters', () => {
    expect(deburr('café🚀naïve😀résumé')).toBe('cafe🚀naive😀resume');
  });

  it('should handle string with emoji', () => {
    expect(deburr('café😀naïve🚀résumé')).toBe('cafe😀naive🚀resume');
  });

  it('should handle string with special characters and diacritical marks', () => {
    expect(deburr('café!@#naïve$%^résumé')).toBe('cafe!@#naive$%^resume');
  });

  it('should handle string with numbers and diacritical marks', () => {
    expect(deburr('café123naïve456résumé789')).toBe('cafe123naive456resume789');
  });

  it('should handle string with mixed separators and diacritical marks', () => {
    expect(deburr('café,naïve;résumé:')).toBe('cafe,naive;resume:');
  });

  it('should handle string with mixed separators, spaces, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:')).toBe('cafe, naive; resume:');
  });

  it('should handle string with mixed separators, spaces, tabs, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t')).toBe('cafe, naive; resume:\t');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n')).toBe('cafe, naive; resume:\t\n');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r')).toBe('cafe, naive; resume:\t\n\r');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r\f')).toBe('cafe, naive; resume:\t\n\r\f');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r\f\v')).toBe('cafe, naive; resume:\t\n\r\f\v');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r\f\v\b')).toBe('cafe, naive; resume:\t\n\r\f\v\b');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r\f\v\b\0')).toBe('cafe, naive; resume:\t\n\r\f\v\b\0');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r\f\v\b\0🚀')).toBe('cafe, naive; resume:\t\n\r\f\v\b\0🚀');
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, emoji, and diacritical marks', () => {
    expect(deburr('café, naïve; résumé:\t\n\r\f\v\b\0🚀😀')).toBe('cafe, naive; resume:\t\n\r\f\v\b\0🚀😀');
  });
});
