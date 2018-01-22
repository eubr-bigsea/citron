(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['jsep'],
      __esModule: true,
    };
  }

  define('@jsep', [], vendorModule);
})();
