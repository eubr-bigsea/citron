'use strict';

gViz.vis.graph.initialize = function () {
  "use strict";

  var _id, _var, animation, colors, container, data, height, main, margin, validate, width;
  _id = void 0;
  _var = void 0;
  animation = 900;
  colors = {
    scale: gViz.shared.helpers.colors.d310
  };
  container = void 0;
  data = void 0;
  height = 100;
  margin = {
    top: 20,
    right: 0,
    bottom: 0,
    left: 0
  };
  width = 100;
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
          _var || (_var = {});
          _var._id = _id;
          _var.animation = animation;
          _var.colors = colors;
          _var.container = {
            selector: container,
            jq: $(container),
            d3: d3.select(container),
            el: d3.select(container).node(),
            rect: {},
            drag: {},
            js: document.querySelector(container)
          };
          _var.data = data;
          _var.margin = margin;
          if (_var.transform == null) {
            _var.transform = {
              k: 1,
              x: _var.margin.left,
              y: _var.margin.top
            };
          }
          _var.height = (height != null ? height : _var.container.jq.outerHeight()) - (_var.margin.top + _var.margin.bottom);
          _var.width = (width != null ? width : _var.container.jq.outerWidth()) - (_var.margin.left + _var.margin.right);
          _var.container.jq.attr('data-vis-id', _var._id);
          _var.search = { jq: $("#search-graph"), d3: d3.select('#search-graph'), value: '' };
          _var.label = { jq: $("#label-graph"), d3: d3.select('#label-graph'), values: {}, centered: {} };
          _var.buttons = {
            reset: d3.select('#zoom-reset'),
            in_out: d3.selectAll('#zoom-in, #zoom-out'),
            actions: d3.selectAll('.canvas-wrapper .controls .action-switch .btn'),
            highlight: d3.select('#highlight-reset')
          };
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
