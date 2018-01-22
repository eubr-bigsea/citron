(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['io'],
      __esModule: true,
    };
  }

  define('@socket.io-client', [], vendorModule);
})();
