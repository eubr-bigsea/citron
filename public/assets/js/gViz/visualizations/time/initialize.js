"use strict";

// Initialize the visualization class
gViz.vis.time.initialize = function () {
  "use strict";

  // Get attributes values

  var _id = "vis-time-" + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _var = undefined;
  var animation = 900;
  var axisY = { zero: true };
  var bounds = undefined;
  var click = { selector: 'svg', fn: function fn(d) {
      if (d == null) {
        d = "Clicked";
      }return console.log(d);
    }
  };
  var colors = { scale: gViz.helpers.colors.main };
  var container = undefined;
  var data = [];
  var height = 100;
  var margin = { top: 10, right: 10, bottom: 10, left: 10 };
  var pan = {};
  var reference = new Date();
  var shape = 'area';
  var timespan = 120;
  var width = 100;
  var zoom = {};

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
          _var.animation = animation;
          _var.click = click;
          _var.colors = colors;
          _var.container = { selector: container, jq: $(container), d3: d3.select(container), el: d3.select(container).node() };

          // Get data
          _var._data = data;

          _var.margin = margin;
          _var.reference = reference;
          _var.shape = shape;
          _var.timespan = timespan;

          // Define height and width
          _var.height = (height != null ? height : _var.container.jq.outerHeight()) - (_var.margin.top + _var.margin.bottom);
          _var.width = (width != null ? width : _var.container.jq.outerWidth()) - (_var.margin.left + _var.margin.right);

          // Scales
          _var.x = d3.scaleLinear().range([0, _var.width]);
          _var.y = d3.scaleLinear().range([_var.height, 0]);
          _var.xAxis = d3.axisBottom(_var.x).tickPadding(10).tickSize(-_var.height);
          _var.yAxis = d3.axisLeft(_var.y).tickFormat(gViz.helpers.number.locale).tickSize(-_var.width);
          _var.axisY = axisY;

          // Pan + Zoom
          _var.pan = pan;
          _var.zoom = zoom;

          // Bounds for pan and zoom
          if (bounds) _var.bounds = bounds;

          // Set attribute _id to container
          _var.container.jq.attr('data-vis-id', _var._id);

          // NO DATA AVAILABLE
          _var.container.jq.find("h5.no-data").remove();
          if (_var._data.length === 0) {
            _var.container.jq.html("<h5 class='no-data' style='line-height: " + _var.height + "px; text-align: center;'>NO DATA AVAILABLE</h5>");
          }

          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'animation', 'axisY', 'bounds', 'click', 'colors', 'container', 'data', 'height', 'margin', 'pan', 'reference', 'shape', 'timespan', 'width', 'zoom'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return main;
    };
  });

  // Execute the specific called function
  main.run = function (_) {
    return main('run');
  };

  return main;
};
