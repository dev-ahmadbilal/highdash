import { isElement } from '../../src/lang/isElement';

describe('isElement', () => {
  it('should return true for DOM element', () => {
    // Create a mock DOM element
    const element = document.createElement('div');
    expect(isElement(element)).toBe(true);
  });

  it('should return true for different element types', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const p = document.createElement('p');

    expect(isElement(div)).toBe(true);
    expect(isElement(span)).toBe(true);
    expect(isElement(p)).toBe(true);
  });

  it('should return false for object', () => {
    expect(isElement({ a: 1 })).toBe(false);
  });

  it('should return false for array', () => {
    expect(isElement([1, 2, 3])).toBe(false);
  });

  it('should return false for string', () => {
    expect(isElement('hello')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isElement(123)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isElement(true)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isElement(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isElement(undefined)).toBe(false);
  });

  it('should return false for function', () => {
    expect(isElement(() => {})).toBe(false);
  });

  it('should return false for document', () => {
    expect(isElement(document)).toBe(false);
  });

  it('should return false for window', () => {
    expect(isElement(window)).toBe(false);
  });
});
