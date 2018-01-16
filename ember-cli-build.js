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

  //Alphabetic order

  app.import('vendor/gridstack/gridstack.min.css');
  app.import('vendor/gridstack/gridstack.min.js');
  app.import('vendor/gridstack/gridstack-extra.min.css');
  app.import('vendor/gridstack/gridstack.min.map');
  app.import('vendor/gridstack/gridstack.all.js');
  app.import('vendor/gridstack/gridstack.jQueryUI.min.js');


  app.import('vendor/jquery-ui/jquery-ui.min.css');
  app.import('vendor/jquery-ui/jquery-ui.theme.min.css');
  app.import('vendor/jquery-ui/jquery-ui.structure.min.css');
  app.import('vendor/jquery-ui/jquery-ui.min.js');

  app.import('vendor/jquery.ui.touch-punch/jquery.ui.touch-punch.min.js');

  app.import('vendor/jsplumb/jsplumb.js');

  app.import('vendor/lodash/lodash.min.js');

  app.import('vendor/metisMenu/metisMenu.js');
  app.import('vendor/metisMenu/metisMenu.css');

  app.import('vendor/nprogress/nprogress.css');
  app.import('vendor/nprogress/nprogress.js');

  app.import('vendor/perfect-scrollbar/perfect-scrollbar.min.css');

  app.import('vendor/prism/prism.js');
  app.import('vendor/prism/prism.css');

  app.import('vendor/resumable.js/resumable.js');

  app.import('vendor/select2/select2.full.js');
  app.import('vendor/select2/select2.css');

  app.import('node_modules/raven-js/dist/raven.js');
  app.import('node_modules/raven-js/dist/plugins/ember.js');

  return app.toTree();
};
