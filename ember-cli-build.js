/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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
/*
    minifyJS: {
      options: {
        exclude: ["assets/js/gViz/**", 
                  "assets/js/gViz", 
                  "public/assets/js/gViz/**"]
      }
    }*/
  });

  app.import('vendor/metisMenu/metisMenu.js');
  app.import('vendor/metisMenu/metisMenu.css');

  app.import('vendor/jsplumb/jsplumb.js');

  app.import('vendor/jquery-ui/jquery-ui.css');
  app.import('vendor/jquery-ui/jquery-ui.js');

  app.import('vendor/select2/select2.full.js');
  app.import('vendor/select2/select2.css');

  // Visualizations Required Libraries
  app.import('vendor/gVis/libs/bootstrap-slider/bootstrap-slider.js');
  app.import('vendor/gVis/libs/bootstrap-slider/bootstrap-slider.css');

  app.import('vendor/gVis/libs/tooltipster/tooltipster.bundle.min.js');
  app.import('vendor/gVis/libs/tooltipster/tooltipster.bundle.min.css');

  app.import('vendor/gVis/libs/d3.v4/d3.v4.min.js');
  app.import('vendor/gVis/libs/d3.position/d3.position.js');
  app.import('vendor/gVis/libs/latinise/latinise_compact.js');

  return app.toTree();
};
