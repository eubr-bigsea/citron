'use strict';

// Initialize the visualization class
gViz.vis.bar_chart = function () {
  "use strict";

  // Get attributes values

  var _id = 'vis-bar-chart-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _class = undefined;
  var _var = undefined;
  var action = 'build';
  var animation = 900;
  var colors = { scale: gViz.helpers.colors.main };
  var container = undefined;
  var data = [];
  var height = undefined;
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = undefined;

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
      case 'axis':
        return true;
      case 'setup':
        return true;
      case 'draw':
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
          main('axis');
          main('draw');
          main('sort');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) {
            _var = {};
          }
          _var = gViz.vis.bar_chart.initialize()._var(_var)._id(_var._id != null ? _var._id : _id)._class(_class).animation(animation).colors(colors).container(container).data(data).height(height).margin(margin).width(width).run();
          break;

        // Create initial elements
        case 'create':

          // Creating
          _var = gViz.vis.bar_chart.create()._var(_var).run();
          break;

        // Setup useful scales
        case 'scales':

          // scales
          _var = gViz.vis.bar_chart.scales()._var(_var).run();
          break;

        case 'axis':

          // scales
          _var = gViz.vis.bar_chart.axis()._var(_var).run();
          break;

        // Setup initial elements
        case 'setup':

          // Setup
          _var = gViz.vis.bar_chart.setup()._var(_var).run();
          break;

        // Draw Matrix
        case 'draw':

          // Setup
          _var = gViz.vis.bar_chart.draw()._var(_var).run();
          break;

        // Draw Matrix
        case 'sort':

          // Setup
          _var = gViz.vis.bar_chart.sort()._var(_var).run();
          break;
      }
    }

    return _var;
  };

  //  Expose global variables
  ['_id', '_class', '_var', 'action', 'animation', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function (key) {

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
  main.axis = function (_) {
    return main("axis");
  };
  main.setup = function (_) {
    return main("setup");
  };
  main.draw = function (_) {
    return main("draw");
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
