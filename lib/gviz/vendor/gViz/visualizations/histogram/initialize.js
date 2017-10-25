gViz.vis.histogram.initialize = function () {
  "use strict";

  // Get attributes values
  var _id       = null;
  var _var      = null;
  var animation = 900;
  var chartType = null;
  var container = null;
  var colors    = { main: gViz.shared.helpers.colors.main };
  var data      = [];
  var height    = null;
  var margin    = { top: 10, right: 10, bottom: 10, left: 10 };
  var width     = null;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Initialize variables
          if (!_var) { _var = {}; }
          _var._id = _id;
          _var.animation = animation;
          _var.colors = colors;
          _var.data = data;
          _var.margin = margin;

          // Map data and get labels
          _var.data = _var._data = data;

          // Get container
          _var.container = {
            selector: container,
            d3: d3.select(container),
            el: (typeof container === 'string' || container instanceof String) ? container : d3.select(container).node()
          };

          // Define height and width
          _var.height = ((height != null) ? height : _var.container.d3.node().getBoundingClientRect().height) - 4 - (_var.margin.top + _var.margin.bottom);
          _var.width = ((width != null) ? width : _var.container.d3.node().getBoundingClientRect().width) - 4 - (_var.margin.left + _var.margin.right);

          // Set attribute _id to container
          _var.container.d3.attr('data-vis-id', _var._id);

          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'animation', 'chartType', 'container', 'colors', 'data', 'height', 'margin', 'width'].forEach(function (key) {

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

  // Execute the specific called function
  main.run = _ => main('run');

  return main;
};
