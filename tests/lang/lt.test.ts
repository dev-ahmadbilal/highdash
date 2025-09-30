import { lt } from '../../src/lang/lt';

describe('lt', () => {
  it('should return true when first value is less', () => {
    expect(lt(1, 3)).toBe(true);
    expect(lt(3.2, 3.5)).toBe(true);
    expect(lt(-1, 0)).toBe(true);
  });

  it('should return false when values are equal', () => {
    expect(lt(3, 3)).toBe(false);
    expect(lt(0, 0)).toBe(false);
  });

  it('should return false when first value is greater', () => {
    expect(lt(3, 1)).toBe(false);
    expect(lt(3.5, 3.2)).toBe(false);
    expect(lt(0, -1)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(lt('1', '3')).toBe(false);
    expect(lt(1, '3')).toBe(false);
    expect(lt('1', 3)).toBe(false);
    expect(lt(null, 1)).toBe(false);
    expect(lt(1, null)).toBe(false);
  });
});
