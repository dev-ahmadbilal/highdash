import { uniqueId } from '../../src/util/uniqueId';

describe('uniqueId', () => {
  it('should generate unique ids', () => {
    const id1 = uniqueId();
    const id2 = uniqueId();
    expect(id1).not.toBe(id2);
  });

  it('should generate unique ids with prefix', () => {
    const id1 = uniqueId('contact_');
    const id2 = uniqueId('contact_');
    expect(id1).toMatch(/^contact_\d+$/);
    expect(id2).toMatch(/^contact_\d+$/);
    expect(id1).not.toBe(id2);
  });

  it('should generate unique ids with empty prefix', () => {
    const id1 = uniqueId('');
    const id2 = uniqueId('');
    expect(id1).toMatch(/^\d+$/);
    expect(id2).toMatch(/^\d+$/);
    expect(id1).not.toBe(id2);
  });

  it('should generate sequential ids', () => {
    const ids = Array.from({ length: 5 }, () => uniqueId());
    const numbers = ids.map(id => parseInt(id, 10));
    
    // Check that numbers are sequential
    for (let i = 1; i < numbers.length; i++) {
      expect(numbers[i]).toBeGreaterThan(numbers[i - 1]);
    }
  });

  it('should generate sequential ids with prefix', () => {
    const ids = Array.from({ length: 5 }, () => uniqueId('test_'));
    const numbers = ids.map(id => parseInt(id.replace('test_', ''), 10));
    
    // Check that numbers are sequential
    for (let i = 1; i < numbers.length; i++) {
      expect(numbers[i]).toBeGreaterThan(numbers[i - 1]);
    }
  });

  it('should work with different prefixes', () => {
    const id1 = uniqueId('user_');
    const id2 = uniqueId('post_');
    const id3 = uniqueId('comment_');
    
    expect(id1).toMatch(/^user_\d+$/);
    expect(id2).toMatch(/^post_\d+$/);
    expect(id3).toMatch(/^comment_\d+$/);
  });

  it('should handle special characters in prefix', () => {
    const id1 = uniqueId('test-');
    const id2 = uniqueId('test.');
    const id3 = uniqueId('test_');
    
    expect(id1).toMatch(/^test-\d+$/);
    expect(id2).toMatch(/^test\.\d+$/);
    expect(id3).toMatch(/^test_\d+$/);
  });

  it('should generate string ids', () => {
    const id = uniqueId();
    expect(typeof id).toBe('string');
  });

  it('should generate numeric string ids', () => {
    const id = uniqueId();
    expect(id).toMatch(/^\d+$/);
    expect(parseInt(id, 10)).toBeGreaterThan(0);
  });
});
