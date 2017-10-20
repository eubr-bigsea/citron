// Initialize the visualization class
gViz.vis.verticalBarChart = function () {
  "use strict";

  // Get attributes values
  var _id = `vis-bar-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var _var = null;
  var action = 'build';
  var animation = 900;
  var container = null;
  var colors = { main: gViz.shared.helpers.colors.main };
  var data = [];
  var height = null;
  var margin = { top: 5, right: 10, bottom: 30, left: 70 };
  var width = null;
  var hover = null;
  var urlLocation = 'ask';
  var fullData = null;

  // Specifics
  var totals = true;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'build':      return (container != null) && (d3.selectAll(container).size() !== 0 || d3.select(container).size() !== 0);
      case 'initialize': return true;
      case 'axis':       return data != null && data.data != null && data.data.length > 0;
      case 'create':     return data != null && data.data != null && data.data.length > 0;
      case 'elements':   return data != null && data.data != null && data.data.length > 0;
      case 'misc':       return data != null && data.data != null && data.data.length > 0;
      case 'style':      return true;
      case 'xScale':     return data != null && data.data != null && data.data.length > 0;
      case 'yScale':     return data != null && data.data != null && data.data.length > 0;
      default:           return false;
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
          main('style');
          main('yScale');
          main('xScale');
          main('create');
          main('axis');
          main('elements');
          main('misc');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) { _var = {};  }
          _var = gViz.vis.verticalBarChart.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .container(container)
            .colors(colors)
            .data(data)
            .height(height)
            .hover(hover)
            .margin(margin)
            .totals(totals)
            .width(width)
            .urlLocation(urlLocation)
            .run();

          break;

        // Setup style functions
        case 'style':

          // Styling
          _var = gViz.vis.verticalBarChart.style()
            ._var(_var)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating wrappers
          _var = gViz.vis.verticalBarChart.create()
            ._var(_var)
            .run();
          break;

        // Setup x scale
        case 'xScale':

          // Creating
          _var = gViz.vis.verticalBarChart.xScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup y scale
        case 'yScale':

          // Creating
          _var = gViz.vis.verticalBarChart.yScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup axis elements
        case 'axis':

          // Running
          _var = gViz.vis.verticalBarChart.axis()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Setup chart elements
        case 'elements':

          // Running
          _var = gViz.vis.verticalBarChart.elements()
            ._var(_var)
            .components(gViz.vis.verticalBarChart)
            .data(_var.data.data)
            .run();
          break;

        // Show Misc
        case 'misc':

          // Running
          _var = gViz.vis.verticalBarChart.misc()
            ._var(_var)
            .components(gViz.vis.verticalBarChart)
            .run();
          break;

      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation', 'container', 'colors', 'data', 'height', 'margin', 'width', 'totals', 'hover', 'urlLocation','fullData'].forEach(function (key) {

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
