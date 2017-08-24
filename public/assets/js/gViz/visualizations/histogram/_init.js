gViz.vis.histogram = function () {
  "use strict";

  // Get attributes values
  var _id       = `vis-histogram-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var _var      = null;
  var action    = 'build';
  var animation = 900;
  var chartType = 'normal'
  var container = null;
  var colors    = { main: gViz.shared.helpers.colors.main };
  var data      = [];
  var height    = null;
  var margin    = { top: 40, right: 10, bottom: 40, left: 10 };
  var width     = null;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'build': return (container != null) && (d3.selectAll(container).size() !== 0 || d3.select(container).size() !== 0);
      case 'initialize': return true;
      case 'create':     return data != null && data.data != null && data.data.length > 0;
      case 'xScale':     return data != null && data.data != null && data.data.length > 0;
      case 'yScale':     return data != null && data.data != null && data.data.length > 0;
      case 'axis':       return true;
      case 'elements':   return true;
      case 'parse':      return true;
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
          main('xScale');
          main('yScale');
          main('create');
          main('axis');
          main('elements');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
           if (_var == null) { _var = {};  }
          _var = gViz.vis.histogram.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .chartType(chartType)
            .container(container)
            .colors(colors)
            .data(data)
            .height(height)
            .margin(margin)
            .width(width)
            .run();

          break;

        // Parse data elements
        case 'parse':

          // Creating wrappers
          _var = gViz.vis.histogram.parse()
            ._var(_var)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating wrappers
          _var = gViz.vis.histogram.create()
            ._var(_var)
            .run();
          break;

        // Setup x scale
        case 'xScale':

          // Creating
          _var = gViz.vis.histogram.xScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup y scale
        case 'yScale':

          // Creating
          _var = gViz.vis.histogram.yScale()
            ._var(_var)
            .data(_var.data.data)
            .run();
          break;

        // Setup axis elements
        case 'axis':

          // Running
          _var = gViz.vis.histogram.axis()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Setup chart elements
        case 'elements':

          // Running
          _var = gViz.vis.histogram.elements()
            ._var(_var)
            .data(_var.bins)
            .run();
          break;

      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation', 'container', 'colors', 'data', 'height', 'margin', 'width', 'chartType'].forEach(function (key) {

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
  main.build = _ => main("build");

  return main;

}
