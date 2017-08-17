'use strict';

// Initialize the visualization class
gViz.vis.pie_chart.initialize = function () {
  "use strict";

  // Get attributes values

  var _id = 'vis-pie_chart-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _class = undefined;
  var _var = undefined;
  var colors = { scale: gViz.helpers.colors.main };
  var container = undefined;
  var animation = 900;
  var data = [];
  var height = null;
  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = null;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Initialize variables
          if (!_var) {
            _var = {};
          }
          _var._id = _id;
          _var._class = _class;
          _var.animation = animation;
          _var.colors = colors;
          _var.container = { selector: container, jq: $(container), d3: d3.select(container), el: d3.select(container).node() };

          // Get data
          _var._data = data.data;

          _var.margin = margin;

          // Define height and width
          _var.height = (height != null ? height : _var.container.jq.outerHeight()) - (_var.margin.top + _var.margin.bottom);
          _var.width = (width != null ? width : _var.container.jq.outerWidth()) - (_var.margin.left + _var.margin.right);

          // Set attribute _id to container
          _var.container.jq.attr('data-vis-id', _var._id);

          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_class', '_var', 'animation', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function (key) {

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

  // Execute the specific called function
  main.run = function (_) {
    return main('run');
  };

  return main;
};
