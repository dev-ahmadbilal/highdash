import { bindAll } from '../../src/util/bindAll';

describe('bindAll', () => {
  it('should bind methods to object', () => {
    const obj = {
      value: 42,
      getValue: function () {
        return this.value;
      },
      setValue: function (val: number) {
        this.value = val;
      },
    };

    bindAll(obj, 'getValue', 'setValue');

    const getValue = obj.getValue;
    const setValue = obj.setValue;

    expect(getValue()).toBe(42);
    setValue(100);
    expect(getValue()).toBe(100);
  });

  it('should bind all methods when no method names provided', () => {
    const obj = {
      value: 42,
      getValue: function () {
        return this.value;
      },
      setValue: function (val: number) {
        this.value = val;
      },
      notAMethod: 'string',
    };

    bindAll(obj);

    const getValue = obj.getValue;
    const setValue = obj.setValue;

    expect(getValue()).toBe(42);
    setValue(100);
    expect(getValue()).toBe(100);
  });

  it('should work with single method', () => {
    const obj = {
      value: 42,
      getValue: function () {
        return this.value;
      },
    };

    bindAll(obj, 'getValue');

    const getValue = obj.getValue;
    expect(getValue()).toBe(42);
  });

  it('should work with nested methods', () => {
    const obj = {
      value: 42,
      nested: {
        getValue: function () {
          return this.value;
        },
      },
    };

    bindAll(obj, 'nested.getValue');

    const getValue = obj.nested.getValue;
    expect(getValue()).toBe(42);
  });

  it('should handle non-function properties', () => {
    const obj = {
      value: 42,
      getValue: function () {
        return this.value;
      },
      notAMethod: 'string',
    };

    bindAll(obj, 'getValue', 'notAMethod');

    const getValue = obj.getValue;
    expect(getValue()).toBe(42);
  });

  it('should handle empty method names array', () => {
    const obj = {
      value: 42,
      getValue: function () {
        return this.value;
      },
    };

    bindAll(obj, ...[]);

    const getValue = obj.getValue;
    expect(getValue()).toBe(42);
  });

  it('should handle null and undefined object', () => {
    expect(bindAll(null)).toBe(null);
    expect(bindAll(undefined)).toBe(undefined);
  });

  it('should handle non-object input', () => {
    expect(bindAll('string')).toBe('string');
    expect(bindAll(123)).toBe(123);
    expect(bindAll(true)).toBe(true);
  });

  it('should work with arrow functions', () => {
    const obj = {
      value: 42,
      getValue: () => this.value, // Arrow functions don't have their own this
    };

    bindAll(obj, 'getValue');

    const getValue = obj.getValue;
    expect(getValue()).toBe(undefined); // Arrow function this is not bound
  });

  it('should work with class methods', () => {
    class TestClass {
      value = 42;

      getValue() {
        return this.value;
      }

      setValue(val: number) {
        this.value = val;
      }
    }

    const obj = new TestClass();
    bindAll(obj, 'getValue', 'setValue');

    const getValue = obj.getValue;
    const setValue = obj.setValue;

    expect(getValue()).toBe(42);
    setValue(100);
    expect(getValue()).toBe(100);
  });
});
