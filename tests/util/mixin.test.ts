import { mixin } from '../../src/util/mixin';

describe('mixin', () => {
  it('should mix functions from source to object', () => {
    const object = {};
    const source = {
      method1: function() { return 'method1'; },
      method2: function() { return 'method2'; },
      property: 'not a function'
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(typeof object.method1).toBe('function');
    expect(typeof object.method2).toBe('function');
    expect(object.property).toBeUndefined();
  });

  it('should work with chain option', () => {
    const object = {};
    const source = {
      method: function() { return 'method'; }
    };

    const result = mixin(object, source, { chain: true });
    
    expect(result).toBe(object);
    expect(typeof object.method).toBe('function');
  });

  it('should work with chain option false', () => {
    const object = {};
    const source = {
      method: function() { return 'method'; }
    };

    const result = mixin(object, source, { chain: false });
    
    expect(result).toBe(object);
    expect(typeof object.method).toBe('function');
  });

  it('should work with no options', () => {
    const object = {};
    const source = {
      method: function() { return 'method'; }
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(typeof object.method).toBe('function');
  });

  it('should handle empty source', () => {
    const object = {};
    const source = {};

    const result = mixin(object, source);
    
    expect(result).toBe(object);
  });

  it('should handle source with only non-function properties', () => {
    const object = {};
    const source = {
      property1: 'string',
      property2: 123,
      property3: true,
      property4: null,
      property5: undefined
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(object.property1).toBeUndefined();
    expect(object.property2).toBeUndefined();
    expect(object.property3).toBeUndefined();
    expect(object.property4).toBeUndefined();
    expect(object.property5).toBeUndefined();
  });

  it('should handle null and undefined object', () => {
    const source = {
      method: function() { return 'method'; }
    };

    expect(mixin(null, source)).toBe(null);
    expect(mixin(undefined, source)).toBe(undefined);
  });

  it('should handle null and undefined source', () => {
    const object = {};

    expect(mixin(object, null)).toBe(object);
    expect(mixin(object, undefined)).toBe(object);
  });

  it('should work with existing object properties', () => {
    const object = {
      existingMethod: function() { return 'existing'; },
      existingProperty: 'existing'
    };
    const source = {
      newMethod: function() { return 'new'; },
      existingMethod: function() { return 'overridden'; }
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(typeof object.newMethod).toBe('function');
    expect(object.newMethod()).toBe('new');
    expect(object.existingMethod()).toBe('overridden');
    expect(object.existingProperty).toBe('existing');
  });

  it('should work with nested functions', () => {
    const object = {};
    const source = {
      outer: function() {
        return function() {
          return 'nested';
        };
      }
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(typeof object.outer).toBe('function');
    expect(object.outer()()).toBe('nested');
  });

  it('should work with arrow functions', () => {
    const object = {};
    const source = {
      arrow: () => 'arrow'
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(typeof object.arrow).toBe('function');
    expect(object.arrow()).toBe('arrow');
  });

  it('should work with async functions', async () => {
    const object = {};
    const source = {
      asyncMethod: async () => 'async'
    };

    const result = mixin(object, source);
    
    expect(result).toBe(object);
    expect(typeof object.asyncMethod).toBe('function');
    const asyncResult = await object.asyncMethod();
    expect(asyncResult).toBe('async');
  });
});
