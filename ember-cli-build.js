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
    minifyJS: {
      options: {
        exclude: [
          "assets/js/gViz/**",
        ]
      }
    }
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

  // Visualizations Required Libraries
  app.import('vendor/gViz/libs/tooltipster/tooltipster.bundle.min.js');
  app.import('vendor/gViz/libs/tooltipster/tooltipster.bundle.min.css');

  app.import('vendor/gViz/libs/d3.v4/d3.v4.min.js');
  app.import('vendor/gViz/libs/d3.position/d3.position.js');
  app.import('vendor/gViz/libs/latinise/latinise_compact.js');

  // Leaflet Heatmap
  app.import('vendor/gViz/libs/leaflet-heat/leaflet-heat.js');

  // Lodash for Gridstack
  app.import('vendor/lodash/lodash.min.js');

  // Gridstack for flex layout
  app.import('vendor/gridstack/gridstack.css');
  app.import('vendor/gridstack/gridstack.js');
  app.import('vendor/gridstack/gridstack.jQueryUI.js');

  app.import('vendor/prism/prism.js');
  app.import('vendor/prism/prism.css');

  return app.toTree();
};
