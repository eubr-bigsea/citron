/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    },
    'ember-font-awesome': {
      useScss: true,
      useLess: false
    },
    fingerprint: {
      exclude: ['assets/images'],
    },
  });

  app.import('vendor/perfect-scrollbar/perfect-scrollbar.min.css');

  app.import('vendor/metisMenu/metisMenu.js');
  app.import('vendor/metisMenu/metisMenu.css');

  app.import('vendor/jsplumb/jsplumb.js');

  app.import('vendor/jquery-ui/jquery-ui.css');
  app.import('vendor/jquery-ui/jquery-ui.js');

  app.import('vendor/select2/select2.full.js');
  app.import('vendor/select2/select2.css');

  app.import('vendor/nprogress/nprogress.css');
  app.import('vendor/nprogress/nprogress.js');

  app.import('vendor/resumable.js/resumable.js');

  app.import('vendor/prism/prism.js');
  app.import('vendor/prism/prism.css');

  return app.toTree();
};
