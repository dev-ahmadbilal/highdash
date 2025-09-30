/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @param string - The string to pad
 * @param length - The padding length
 * @param chars - The string used as padding
 * @returns Returns the padded string
 *
 * @example
 * ```typescript
 * pad('abc', 8);
 * // => '  abc   '
 *
 * pad('abc', 8, '_-');
 * // => '_-abc_-_'
 *
 * pad('abc', 3);
 * // => 'abc'
 * ```
 */
export function pad(string: string, length: number = 0, chars: any = ' '): string {
  if (typeof string !== 'string' || length <= string.length) {
    return string;
  }

  const padLength = length - string.length;
  // Coerce chars; default to single space if not a non-empty string
  const padCharsStr = typeof chars === 'string' && chars.length > 0 ? chars : ' ';
  const units = Array.from(padCharsStr);

  const leftPadLength = Math.ceil(padLength / 2);
  const rightPadLength = padLength - leftPadLength;

  const build = (count: number): string => {
    if (count <= 0) return '';
    let out = '';
    for (let i = 0; i < count; i++) {
      out += units[i % units.length];
    }
    return out;
  };

  const leftPad = build(leftPadLength);
  const rightPad = build(rightPadLength);

  return leftPad + string + rightPad;
}
