'use strict';

gViz.vis.graph.create = function () {
  "use strict";

  var _var, animation, main, validate;
  _var = void 0;
  animation = 900;
  validate = function validate(step) {
    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };
  main = function main(step) {
    if (validate(step)) {
      switch (step) {
        case 'run':
          if (!(_var.container.canvas != null || _var.container.rect.canvas != null || _var.container.drag.canvas != null)) {
            _var.container.jq.html("<canvas class='canvas-graph'></canvas><svg class='canvas-rect'><g class='brush'></g></svg><canvas class='canvas-drag'></canvas>");
          }
          _var.container.canvas = _var.container.d3.select('canvas.canvas-graph');
          _var.canvas = document.querySelector(_var.container.selector + " canvas.canvas-graph");
          _var.context = _var.canvas.getContext("2d");
          _var.container.canvas.attr("width", _var.width).attr("height", _var.height);
          _var.container.rect.svg = _var.container.d3.select('svg.canvas-rect');
          _var.container.rect.svg.attr("width", _var.width).attr("height", _var.height);
          _var.container.drag.d3canvas = _var.container.d3.select('canvas.canvas-drag');
          _var.container.drag.canvas = document.querySelector(_var.container.selector + " canvas.canvas-drag");
          _var.container.drag.context = _var.container.drag.canvas.getContext("2d");
          _var.container.drag.d3canvas.attr("width", _var.width).attr("height", _var.height);
          if (_var.selection == null) {
            _var.selection = {
              hover: void 0,
              clicked: {},
              searched: {},
              neighbours: {},
              searched: {},
              globalAlpha: 1,
              dragging: false
            };
          }
      }
    }
    return _var;
  };
  ['_var', 'animation'].forEach(function (key) {
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
