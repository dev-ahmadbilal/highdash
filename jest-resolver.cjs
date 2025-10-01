// eslint-disable-next-line no-undef, @typescript-eslint/no-require-imports
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
  sync: (request, options) => {
    // Handle .js extensions in TypeScript files
    if (request.endsWith('.js') && options.basedir) {
      // Try to resolve as .ts first
      const tsPath = request.replace(/\.js$/, '.ts');
      try {
        return options.defaultResolver(tsPath, options);
      } catch (e) {
        // Fall back to original request
        return options.defaultResolver(request, options);
      }
    }
    return options.defaultResolver(request, options);
  },
  async: async (request, options) => {
    // Handle .js extensions in TypeScript files
    if (request.endsWith('.js') && options.basedir) {
      // Try to resolve as .ts first
      const tsPath = request.replace(/\.js$/, '.ts');
      try {
        return options.defaultResolver(tsPath, options);
      } catch (e) {
        // Fall back to original request
        return options.defaultResolver(request, options);
      }
    }
    return options.defaultResolver(request, options);
  },
};
