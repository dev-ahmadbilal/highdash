/**
 * Deburrs `string` by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.
 *
 * @param string - The string to deburr
 * @returns Returns the deburred string
 *
 * @example
 * ```typescript
 * deburr('déjà vu');
 * // => 'deja vu'
 * ```
 */
export function deburr(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  // Manual fallback mappings for special cases
  const extraMap: Record<string, string> = {
    ß: 'ss',
    Æ: 'AE',
    æ: 'ae',
    Ø: 'O',
    ø: 'o',
    Þ: 'TH',
    þ: 'th',
    Ð: 'D',
    ð: 'd',
    ı: 'i',
    Ł: 'L',
    ł: 'l',
  };

  return string
    .split('')
    .map((char) => {
      if (extraMap[char]) {
        return extraMap[char];
      }
      return char.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip combining marks
    })
    .join('');
}
