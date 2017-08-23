// Initialize the visualization class
gViz.vis.donutChart = function () {
  "use strict";

  // Auxiliar Functions
  var _id = 'vis-donut-chart-' + (Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5).toString();
  var _var = null;
  var action = 'build';
  var animation = 900;
  var container = null;
  var colors = { main: gViz.shared.helpers.colors.main, d3: d3.scaleOrdinal(d3.schemeCategory10) };
  var data = [];
  var height = null;
  var margin = { top: 10, right: 10, bottom: 10, left: 10};
  var metric = "x";
  var width = null;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'build':      return (container != null) && (d3.selectAll(container).size() !== 0 || d3.select(container).size() !== 0);
      case 'initialize': return true;
      case 'create':     return data != null && data.data != null && data.data.length > 0;
      case 'elements':   return data != null && data.data != null && data.data.length > 0;
      case 'misc':       return data != null && data.data != null && data.data.length > 0;
      case 'parse':      return data != null && data.data != null && data.data.length > 0;
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
          main('parse');
          main('create');
          main('elements');
          main('misc');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) { _var = {};  }
          _var = gViz.vis.donutChart.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .container(container)
            .colors(colors)
            .data(data)
            .height(height)
            .margin(margin)
            .metric(metric)
            .width(width)
            .run();
          break;

        // Parse data
        case 'parse':

          // Creating wrappers
          _var = gViz.vis.donutChart.parse()
            ._var(_var)
            .run();
          break;


        // Create initial elements
        case 'create':

          // Creating wrappers
          _var = gViz.vis.donutChart.create()
            ._var(_var)
            .run();
          break;

        // Setup elements
        case 'elements':

          // Creating wrappers
          _var = gViz.vis.donutChart.elements()
            ._var(_var)
            .components(gViz.vis.donutChart)
            .data(_var.data.data)
            .run();
          break;

        // Show misc elements
        case 'misc':

          // Running
          _var = gViz.vis.donutChart.misc()
            ._var(_var)
            .components(gViz.vis.donutChart)
            .run();
          break;

      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation','container', 'colors', 'data', 'height', 'margin', 'metric', 'width'].forEach(function (key) {

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
