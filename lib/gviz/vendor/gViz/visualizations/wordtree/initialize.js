gViz.vis.wordtree.initialize = function () {
  "use strict";

  // Get attributes values
  var _id       = 'vis-wordtree-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _var      = null;
  var action    = 'build';
  var animation = 900;
  var click     = { selector: 'svg', fn: function fn(d) { if (d == null) { d = "Clicked"; } return console.log(d); } };
  var colors    = { scale: gViz.shared.helpers.colors.main };
  var container = null;
  var data      = [];
  var height    = 100;
  var margin    = { top: 10, right: 10, bottom: 10, left: 10 };
  var width     = 100;

  // Validate attributes
  var validate = function validate(step) {
    switch (step) {
      case 'run': return true;
      default: return false;
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

          // Define height and width
          _var.height = (height != null ? height : _var.container.jq.outerHeight()) - (_var.margin.top + _var.margin.bottom);
          _var.width = (width != null ? width : _var.container.jq.outerWidth()) - (_var.margin.left + _var.margin.right);

          // Define font scale
          _var.fontScale = d3.scaleLinear().range([12, 40]);

          // Set attribute _id to container
          _var.container.jq.attr('data-vis-id', _var._id);

          // NO DATA AVAILABLE
          _var.container.jq.find("h5.no-data").remove();
          if (_var._data.length === 0) {
            _var.container.jq.html("<h5 class='no-data' style='margin: 0px 10px; line-height: " + height + "px; text-align: center;'>NO DATA AVAILABLE</h5>");
          }

          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'animation', 'click', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function (key) {

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
