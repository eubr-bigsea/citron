// Initialize the visualization class
gViz.vis.scatterPlot = function () {
  "use strict";

  // Get attributes values
  var _id = `vis-scatter-plot-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var _var = null;
  var action = 'build';
  var animation = 900;
  var container = null;
  var colors = { main: gViz.shared.helpers.colors.main };
  var data = [];
  var height = null;
  var margin = { top: 10, right: 10, bottom: 35, left: 0 };
  var width = null;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'build':      return (container != null) && (d3.selectAll(container).size() !== 0 || d3.select(container).size() !== 0);
      case 'initialize': return true;
      case 'axis':       return data != null && data.data != null && data.data.length > 0;
      case 'create':     return data != null && data.data != null && data.data.length > 0;
      case 'elements':   return data != null && data.data != null && data.data.length > 0;
      case 'misc':       return data != null && data.data != null;
      case 'xScale':     return data != null && data.data != null && data.data.length > 0;
      case 'yScale':     return data != null && data.data != null && data.data.length > 0;
      case 'zScale':     return data != null && data.data != null && data.data.length > 0;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'build':

          main('initialize');
          main('yScale');
          main('xScale');
          main('zScale');
          main('create');
          main('axis');
          main('elements');
          main('misc');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) { _var = {};  }
          _var = gViz.vis.scatterPlot.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .container(container)
            .colors(colors)
            .data(data)
            .height(height)
            .margin(margin)
            .width(width)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating wrappers
          _var = gViz.vis.scatterPlot.create()
            ._var(_var)
            .run();
          break;

        // Setup X scale
        case 'xScale':

          // Creating
          _var = gViz.vis.scatterPlot.xScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup Y scale
        case 'yScale':

          // Creating
          _var = gViz.vis.scatterPlot.yScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup Z scale
        case 'zScale':

          // Creating
          _var = gViz.vis.scatterPlot.zScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup axis elements
        case 'axis':

          // Running
          _var = gViz.vis.scatterPlot.axis()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Setup elements
        case 'elements':

          // Running
          _var = gViz.vis.scatterPlot.elements()
            ._var(_var)
            .components(gViz.vis.scatterPlot)
            .run();
          break;

        // Show Misc
        case 'misc':

          // Running
          _var = gViz.vis.scatterPlot.misc()
            ._var(_var)
            .components(gViz.vis.scatterPlot)
            .run();
          break;

      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation', 'container', 'colors', 'data', 'height', 'margin', 'width'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Secondary functions
  main.build = function (_) { return main("build"); };

  // Execute the specific called function
  main.run = function (_) { return main(_); };

  return main;

}
