/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    dotEnv: {
      clientAllowedKeys: ['CITRON_PRIVATE_KEY']
    }
  });

  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot');
  app.import('bower_components/tether/dist/css/tether.css');
  app.import('bower_components/tether/dist/js/tether.js');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/jsplumb/jsplumb.js');
  app.import('bower_components/nprogress/nprogress.js');
  app.import('bower_components/nprogress/nprogress.css');
  app.import('bower_components/metisMenu/dist/metisMenu.css');
  app.import('bower_components/metisMenu/dist/metisMenu.js');
  app.import('bower_components/jquery-ui/themes/base/jquery-ui.css');
  app.import('bower_components/jquery-ui/jquery-ui.js');

  app.import('bower_components/perfect-scrollbar/js/perfect-scrollbar.js');
  app.import('bower_components/perfect-scrollbar/css/perfect-scrollbar.css');

  return app.toTree();
};
