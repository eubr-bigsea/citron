(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['NProgress'],
      __esModule: true,
    };
  }

  define('@nprogress', [], vendorModule);
})();
