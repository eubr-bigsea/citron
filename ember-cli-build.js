/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 4
    },
    'ember-font-awesome': {
      useScss: true,
      useLess: false
    }
  });

  app.import('vendor/metisMenu/metisMenu.js');
  app.import('vendor/metisMenu/metisMenu.css');

  app.import('vendor/jsplumb/jsplumb.js');

  app.import('vendor/jquery-ui/jquery-ui.css');
  app.import('vendor/jquery-ui/jquery-ui.js');

  return app.toTree();
};
