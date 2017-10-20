'use strict';

// Initialize the visualization class
gViz.vis.matrix_chart = function () {
  "use strict";

  // Get attributes values

  var _id = 'vis-matrix-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _class = undefined;
  var _var = undefined;
  var action = 'build';
  var animation = 900;
  var container = undefined;
  var data = [];
  var colors = { scale: gViz.shared.helpers.colors.main };
  var height = undefined;
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = undefined;

  // Legend Variables
  var legend_width  = 170;
  var legend_height = 20;
  var legend_ticks  = 3;
  var legend_domain = undefined;
  var legend_units  = "discrete";
  var legend_title  = "Number of Comments"

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'build':
        return container != null && $(container).length !== 0;
      case 'initialize':
        return true;
      case 'create':
        return true;
      case 'scales':
        return true;
      case 'setup':
        return true;
      case 'draw':
        return true;
      case 'legend':
        return true;
      case 'sort':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {

    //Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'build':

          main('initialize');
          main('create');
          main('scales');
          main('setup');
          main('draw');
          main('legend');
          main('sort');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) {
            _var = {};
          }

          _var = gViz.vis.matrix_chart.initialize()
            ._var(_var)
            ._id(_var._id != null ? _var._id : _id)
            ._class(_class)
            .animation(animation)
            .colors(colors)
            .container(container)
            .data(data)
            .height(height)
            .margin(margin)
            .width(width)
            .run();

          break;

        // Create initial elements
        case 'create':

          // Creating
          _var = gViz.vis.matrix_chart.create()._var(_var).run();
          break;

        // Setup useful scales
        case 'scales':

          // scales
          _var = gViz.vis.matrix_chart.scales()._var(_var).run();
          break;

        // Setup initial elements
        case 'setup':

          // Setup
          _var = gViz.vis.matrix_chart.setup()._var(_var).run();
          break;

        // Draw Matrix
        case 'draw':

          // Setup
          _var = gViz.vis.matrix_chart.draw()._var(_var).run();
          break;

        // Draw Legend
        case 'legend':

          // Setup
          _var = gViz.vis.matrix_chart.legend()
            ._var(_var)
            .width(legend_width)
            .height(legend_height)
            .units(legend_units)
            .ticks(legend_ticks)
            .title(legend_title)
            .legend_domain(legend_domain)
            .run();

          break;

        // Draw Matrix
        case 'sort':

          // Setup
          _var = gViz.vis.matrix_chart.sort()._var(_var).run();
          break;
      }
    }

    return _var;
  };

  //  Expose global variables
  ['_id', '_class', '_var', 'action', 'animation', 'colors', 'container', 'data',
    'height', 'margin', 'width', 'legend_height','legend_width',
    'legend_ticks', 'legend_units', 'legend_title', 'legend_domain'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) {
        eval('return ' + key);
      }
      eval(key + ' = _');
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) {
        eval('return ' + key);
      }
      eval(key + ' = _');
      return main;
    };
  });

  // Secondary functions
  main.build = function (_) {
    return main("build");
  };
  main.initialize = function (_) {
    return main("initialize");
  };
  main.create = function (_) {
    return main("create");
  };
  main.scales = function (_) {
    return main("scales");
  };
  main.setup = function (_) {
    return main("setup");
  };
  main.draw = function (_) {
    return main("draw");
  };
  main.legend = function (_) {
    return main("legend");
  };
  main.sort = function (_) {
    return main("sort");
  };

  // Execute the specific called function
  main.run = function (_) {
    return main(_);
  };

  return main;
};
