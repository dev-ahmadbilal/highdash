import { unescape } from '../../src/string/unescape';

describe('unescape', () => {
  it('should unescape HTML entities', () => {
    expect(unescape('fred, barney, &amp; pebbles')).toBe('fred, barney, & pebbles');
  });

  it('should unescape ampersand', () => {
    expect(unescape('&amp;')).toBe('&');
  });

  it('should unescape less than', () => {
    expect(unescape('&lt;')).toBe('<');
  });

  it('should unescape greater than', () => {
    expect(unescape('&gt;')).toBe('>');
  });

  it('should unescape double quote', () => {
    expect(unescape('&quot;')).toBe('"');
  });

  it('should unescape single quote', () => {
    expect(unescape('&#39;')).toBe("'");
  });

  it('should unescape multiple entities', () => {
    expect(unescape('&amp;&lt;&gt;&quot;&#39;')).toBe('&<>"\'');
  });

  it('should handle empty string', () => {
    expect(unescape('')).toBe('');
  });

  it('should handle string without entities', () => {
    expect(unescape('hello world')).toBe('hello world');
  });

  it('should handle string with numbers', () => {
    expect(unescape('hello123')).toBe('hello123');
  });

  it('should handle string with spaces', () => {
    expect(unescape('hello world')).toBe('hello world');
  });

  it('should handle string with punctuation', () => {
    expect(unescape('hello, world!')).toBe('hello, world!');
  });

  it('should handle string with mixed content', () => {
    expect(unescape('hello &amp; world &lt; test &gt; &quot;quote&quot; &#39;single&#39;')).toBe(
      'hello & world < test > "quote" \'single\'',
    );
  });

  it('should handle string with multiple lines', () => {
    expect(unescape('hello\nworld')).toBe('hello\nworld');
  });

  it('should handle string with tabs', () => {
    expect(unescape('hello\tworld')).toBe('hello\tworld');
  });

  it('should handle string with carriage returns', () => {
    expect(unescape('hello\rworld')).toBe('hello\rworld');
  });

  it('should handle string with form feeds', () => {
    expect(unescape('hello\fworld')).toBe('hello\fworld');
  });

  it('should handle string with vertical tabs', () => {
    expect(unescape('hello\vworld')).toBe('hello\vworld');
  });

  it('should handle string with backspaces', () => {
    expect(unescape('hello\bworld')).toBe('hello\bworld');
  });

  it('should handle string with null characters', () => {
    expect(unescape('hello\0world')).toBe('hello\0world');
  });

  it('should handle string with unicode characters', () => {
    expect(unescape('hello🚀world')).toBe('hello🚀world');
  });

  it('should handle string with emoji', () => {
    expect(unescape('hello😀world')).toBe('hello😀world');
  });

  it('should handle string with special characters and HTML entities', () => {
    expect(unescape('hello &amp; world &lt; test &gt; &quot;quote&quot; &#39;single&#39;')).toBe(
      'hello & world < test > "quote" \'single\'',
    );
  });

  it('should handle string with numbers and HTML entities', () => {
    expect(unescape('123 &amp; 456 &lt; 789 &gt; &quot;quote&quot; &#39;single&#39;')).toBe(
      '123 & 456 < 789 > "quote" \'single\'',
    );
  });

  it('should handle string with mixed separators and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;')).toBe(
      'hello, & world; < test: > "quote" \'single\'',
    );
  });

  it('should handle string with mixed separators, spaces, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;')).toBe(
      'hello, & world; < test: > "quote" \'single\'',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r\f',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r\f\v',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b\0')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b\0',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b\0🚀')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b\0🚀',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, emoji, and HTML entities', () => {
    expect(unescape('hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b\0🚀😀')).toBe(
      'hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b\0🚀😀',
    );
  });
});
