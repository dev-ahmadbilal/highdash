import { escape } from '../../src/string/escape';

describe('escape', () => {
  it('should escape HTML entities', () => {
    expect(escape('fred, barney, & pebbles')).toBe('fred, barney, &amp; pebbles');
  });

  it('should escape ampersand', () => {
    expect(escape('&')).toBe('&amp;');
  });

  it('should escape less than', () => {
    expect(escape('<')).toBe('&lt;');
  });

  it('should escape greater than', () => {
    expect(escape('>')).toBe('&gt;');
  });

  it('should escape double quote', () => {
    expect(escape('"')).toBe('&quot;');
  });

  it('should escape single quote', () => {
    expect(escape("'")).toBe('&#39;');
  });

  it('should escape multiple characters', () => {
    expect(escape('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;');
  });

  it('should handle empty string', () => {
    expect(escape('')).toBe('');
  });

  it('should handle string without special characters', () => {
    expect(escape('hello world')).toBe('hello world');
  });

  it('should handle string with numbers', () => {
    expect(escape('hello123')).toBe('hello123');
  });

  it('should handle string with spaces', () => {
    expect(escape('hello world')).toBe('hello world');
  });

  it('should handle string with punctuation', () => {
    expect(escape('hello, world!')).toBe('hello, world!');
  });

  it('should handle string with mixed content', () => {
    expect(escape('hello & world < test > "quote" \'single\'')).toBe(
      'hello &amp; world &lt; test &gt; &quot;quote&quot; &#39;single&#39;',
    );
  });

  it('should handle string with multiple lines', () => {
    expect(escape('hello\nworld')).toBe('hello\nworld');
  });

  it('should handle string with tabs', () => {
    expect(escape('hello\tworld')).toBe('hello\tworld');
  });

  it('should handle string with carriage returns', () => {
    expect(escape('hello\rworld')).toBe('hello\rworld');
  });

  it('should handle string with form feeds', () => {
    expect(escape('hello\fworld')).toBe('hello\fworld');
  });

  it('should handle string with vertical tabs', () => {
    expect(escape('hello\vworld')).toBe('hello\vworld');
  });

  it('should handle string with backspaces', () => {
    expect(escape('hello\bworld')).toBe('hello\bworld');
  });

  it('should handle string with null characters', () => {
    expect(escape('hello\0world')).toBe('hello\0world');
  });

  it('should handle string with unicode characters', () => {
    expect(escape('hello🚀world')).toBe('hello🚀world');
  });

  it('should handle string with emoji', () => {
    expect(escape('hello😀world')).toBe('hello😀world');
  });

  it('should handle string with special characters and HTML entities', () => {
    expect(escape('hello & world < test > "quote" \'single\'')).toBe(
      'hello &amp; world &lt; test &gt; &quot;quote&quot; &#39;single&#39;',
    );
  });

  it('should handle string with numbers and HTML entities', () => {
    expect(escape('123 & 456 < 789 > "quote" \'single\'')).toBe(
      '123 &amp; 456 &lt; 789 &gt; &quot;quote&quot; &#39;single&#39;',
    );
  });

  it('should handle string with mixed separators and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;',
    );
  });

  it('should handle string with mixed separators, spaces, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r\f')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r\f\v')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b\0')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b\0',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b\0🚀')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b\0🚀',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, emoji, and HTML entities', () => {
    expect(escape('hello, & world; < test: > "quote" \'single\'\t\n\r\f\v\b\0🚀😀')).toBe(
      'hello, &amp; world; &lt; test: &gt; &quot;quote&quot; &#39;single&#39;\t\n\r\f\v\b\0🚀😀',
    );
  });
});
