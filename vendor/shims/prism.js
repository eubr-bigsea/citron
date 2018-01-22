(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['Prism'],
      __esModule: true,
    };
  }

  define('@prism', [], vendorModule);
})();
