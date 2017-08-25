gViz.vis.graph.initialize = function () {
  "use strict";

  // Initialize variables
  var _id       = "vis-graph-" + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _var      = null;
  var action    = 'build';
  var animation = 900;
  var colors    = { scale: gViz.shared.helpers.colors.d310 };
  var container = null;
  var data      = [];
  var height    = null;
  var margin    = { top: 0, right: 0, bottom: 50, left: 0 };
  var width      = null;

  // Validate function
  var validate = function (step) {
    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate step first
    if (validate(step)) {

      // Each step
      switch (step) {

        // Run steps
        case 'run':

          // Initialize variables
          _var || (_var = {});
          _var._id = _id;
          _var.animation = animation;
          _var.colors = colors;
          _var.data = data;
          _var.margin = margin;

          // Set container
          _var.container = {
            selector: container,
            jq: $(container),
            d3: d3.select(container),
            el: d3.select(container).node(),
            rect: {},
            drag: {},
            js: document.querySelector(container)
          };

          console.log(_var.container.jq.parent().outerHeight());

          // Set transform
          if (_var.transform == null) { _var.transform = { k: 1, x: _var.margin.left, y: _var.margin.top }; }

          // Set dimensions
          _var.height = (height != null ? height : _var.container.jq.outerHeight()) - (_var.margin.top + _var.margin.bottom);
          _var.width = (width != null ? width : _var.container.jq.outerWidth()) - (_var.margin.left + _var.margin.right);

          /// Set container unique data-vis-id
          _var.container.jq.attr('data-vis-id', _var._id);

          // Initialize search
          _var.search = { jq: $("#search-graph"), d3: d3.select('#search-graph'), value: '' };

          // Initialize label
          _var.label = { jq: $("#label-graph"), d3: d3.select('#label-graph'), values: {}, centered: {} };

          // Initialize buttons
          _var.buttons = {
            reset: d3.select('#zoom-reset'),
            in_out: d3.selectAll('#zoom-in, #zoom-out'),
            actions: d3.selectAll('.canvas-wrapper .controls .action-switch .btn'),
            highlight: d3.select('#highlight-reset')
          };

          break;
      }
    }

    return _var;
  };

  ['_id', '_var', 'animation', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function (key) {
    validate[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return validate;
    };
    return main[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return main;
    };
  });
  main.run = function (_) {
    return main('run');
  };
  return main;
};
