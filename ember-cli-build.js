'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    },
    fingerprint: {
      exclude: ['assets/images'],
    },
  });

  //Alphabetic order
  app.import('node_modules/lodash/lodash.js'); // gridstack requirements
  app.import('node_modules/jquery-ui-dist/jquery-ui.css'); // gridstack requirements
  app.import('node_modules/jquery-ui-dist/jquery-ui.theme.css'); // gridstack requirements
  app.import('node_modules/jquery-ui-dist/jquery-ui.structure.css'); // gridstack requirements
  app.import('node_modules/jquery-ui-dist/jquery-ui.js'); // gridstack requirements
  app.import('node_modules/gridstack/dist/gridstack.css');
  app.import('node_modules/gridstack/dist/gridstack-extra.css');
  app.import('node_modules/gridstack/dist/gridstack.all.js');

  app.import('node_modules/jsplumb/dist/js/jsplumb.js');
  app.import('vendor/shims/jsplumb.js');

  app.import('node_modules/metismenu/dist/metisMenu.js');
  app.import('node_modules/metismenu/dist/metisMenu.css');

  app.import('node_modules/nprogress/nprogress.css');
  app.import('node_modules/nprogress/nprogress.js');
  app.import('vendor/shims/nprogress.js');

  app.import('node_modules/perfect-scrollbar/css/perfect-scrollbar.css');
  app.import('node_modules/perfect-scrollbar/dist/perfect-scrollbar.js');
  app.import('vendor/shims/perfect-scrollbar.js');

  app.import('node_modules/moment/min/moment-with-locales.js');
  app.import('vendor/shims/moment.js');

  app.import('node_modules/jsep/build/jsep.js');
  app.import('vendor/shims/jsep.js');

  app.import('node_modules/socket.io-client/dist/socket.io.js');
  app.import('vendor/shims/socket.io-client.js');

  /* FIXME Remove when we upgrade ember-bootstrap */
  app.import('node_modules/bootstrap/dist/js/bootstrap.js');

  app.import('vendor/prism/prism.js');
  app.import('vendor/prism/prism.css');

  app.import('node_modules/resumablejs/resumable.js');
  app.import('vendor/shims/resumable.js');

  app.import('node_modules/select2/dist/js/select2.full.js');
  app.import('node_modules/select2/dist/css/select2.css');

  app.import('node_modules/raven-js/dist/raven.js');
  app.import('node_modules/raven-js/dist/plugins/ember.js');

  app.import('node_modules/@mdi/font/css/materialdesignicons.css');

  return app.toTree();
};
