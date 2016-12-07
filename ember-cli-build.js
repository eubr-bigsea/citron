/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});


  app.import('bower_components/font-awesome/fonts/FontAwesome.otf', {destDir: 'fonts'});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot', {destDir: 'fonts'});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', {destDir: 'fonts'});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {destDir: 'fonts'});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {destDir: 'fonts'});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {destDir: 'fonts'});
  app.import('bower_components/font-awesome/css/font-awesome.css');
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

  app.import('bower_components/doT/doT.js');
  app.import('bower_components/jquery-extendext/jQuery.extendext.js');
  app.import('bower_components/jQuery-QueryBuilder/dist/js/query-builder.js');
  app.import('bower_components/jQuery-QueryBuilder/dist/css/query-builder.default.css');
  app.import('bower_components/jQuery-QueryBuilder/dist/i18n/query-builder.pt-BR.js');
  app.import('bower_components/moment/moment.js');
  app.import('bower_components/moment/locale/pt-br.js');

  app.import('bower_components/jstree-bootstrap-theme/dist/themes/proton/30px.png', {destDir: 'assets'});
  app.import('bower_components/jstree-bootstrap-theme/dist/themes/proton/32px.png', {destDir: 'assets'});
  app.import('bower_components/jstree-bootstrap-theme/dist/themes/proton/throbber.gif', {destDir: 'assets'});
  app.import('bower_components/jstree/dist/themes/default/style.css');
  app.import('bower_components/jstree-bootstrap-theme/dist/themes/proton/style.css');
  app.import('bower_components/jstree/dist/jstree.js');
  return app.toTree();
};
