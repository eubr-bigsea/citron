'use strict';

gViz.vis.graph.drag = function () {
  "use strict";

  var _var, action, animation, event, main, node, validate;
  _var = void 0;
  animation = 900;
  action = 'build';
  node = void 0;
  event = void 0;
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
          switch (action) {
            case 'bind':
              _var.dragsubject = function (e) {
                var origin;
                e = this;
                origin = d3.mouse(e);
                var sb = _var.simulation.find((origin[0] - _var.transform.x) / _var.transform.k, (origin[1] - _var.transform.y) / _var.transform.k, 25);
                return sb != null && sb.centered != null && sb.centered ? null : sb;
              };
              _var.dragstarted = function () {
                if (!d3.event.active) {
                  _var.simulation.alphaTarget(0.1).restart();
                }
                d3.event.subject.fx = d3.event.subject.x;
                d3.event.subject.fy = d3.event.subject.y;
                _var.selection.dragging = true;
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.dragged = function () {
                var e, origin;
                e = this;
                origin = d3.mouse(e);
                d3.event.subject.fx = (origin[0] - _var.transform.x) / _var.transform.k;
                d3.event.subject.fy = (origin[1] - _var.transform.y) / _var.transform.k;
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.dragended = function () {
                if (!d3.event.active) {
                  _var.simulation.alphaTarget(0);
                }
                d3.event.subject.fx = null;
                d3.event.subject.fy = null;
                _var.selection.dragging = false;
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.container.drag.d3canvas.call(d3.drag().container(_var.canvas).subject(_var.dragsubject).on("start", _var.dragstarted).on("drag", _var.dragged).on("end", _var.dragended));
          }
      }
    }
    return _var;
  };
  ['_var', 'action', 'animation', 'node', 'event'].forEach(function (key) {
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
