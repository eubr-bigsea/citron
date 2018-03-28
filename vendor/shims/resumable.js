(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['Resumable'],
      __esModule: true,
    };
  }

  define('@resumable', [], vendorModule);
})();
