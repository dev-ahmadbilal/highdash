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
export function pad(string: string, length: number = 0, chars: string = ' '): string {
  if (typeof string !== 'string' || length <= string.length) {
    return string;
  }

  const padLength = length - string.length;
  const leftPadLength = Math.floor(padLength / 2);
  const rightPadLength = padLength - leftPadLength;

  const leftPad = chars.repeat(Math.ceil(leftPadLength / chars.length)).slice(0, leftPadLength);
  const rightPad = chars.repeat(Math.ceil(rightPadLength / chars.length)).slice(0, rightPadLength);

  return leftPad + string + rightPad;
}
