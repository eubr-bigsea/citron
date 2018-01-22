(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['jsPlumb'],
      __esModule: true,
    };
  }

  define('@jsplumb', [], vendorModule);
})();
