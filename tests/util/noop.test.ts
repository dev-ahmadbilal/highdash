import { noop } from '../../src/util/noop';

describe('noop', () => {
  it('should return undefined', () => {
    expect(noop()).toBeUndefined();
  });

  it('should accept any arguments', () => {
    expect(noop(1, 2, 3)).toBeUndefined();
    expect(noop('hello', 'world')).toBeUndefined();
    expect(noop({}, [], null)).toBeUndefined();
  });
});
