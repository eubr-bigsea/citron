/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/tether/dist/css/tether.css');
  app.import('bower_components/tether/dist/js/tether.js');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/jsPlumb/dist/js/jsPlumb-2.2.1.js');

  app.import('bower_components/nprogress/nprogress.js');
  app.import('bower_components/nprogress/nprogress.css');
  app.import('bower_components/metisMenu/dist/metisMenu.css');
  app.import('bower_components/metisMenu/dist/metisMenu.js');
  app.import('bower_components/jquery-ui/themes/base/jquery-ui.css');
  app.import('bower_components/jquery-ui/jquery-ui.js');

  app.import('vendor/modular-admin-html-1.0.1/css/app.css');
  app.import('vendor/modular-admin-html-1.0.1/css/header.css');
  app.import('vendor/modular-admin-html-1.0.1/css/footer.css');
  app.import('vendor/modular-admin-html-1.0.1/css/sidebar.css');
  app.import('vendor/modular-admin-html-1.0.1/css/nav.css');
  app.import('vendor/modular-admin-html-1.0.1/css/misc.css');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
