'use strict';

gViz.vis.graph.brush = function () {
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
            case 'reset':
              _var.container.rect.svg.html("<g class='brush'></g>");
              _var.brush = null;
              break;
            case 'bind':
              _var.extent = function () {
                var svg;
                svg = this.ownerSVGElement || this;
                return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
              };
              _var.brush = d3.brush().extent(_var.extent);
              _var.brushstarted = function () {
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.brushed = function () {
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.brushended = function () {
                var bounds, dx, dy, m, origin, transform, x, y;
                if (d3.event.selection != null) {
                  origin = [d3.event.selection[0][0], d3.event.selection[0][1]];
                  m = [d3.event.selection[1][0], d3.event.selection[1][1]];
                  m[0] = (Math.max(0, Math.min(_var.width, m[0])) - _var.transform.x) / _var.transform.k;
                  m[1] = (Math.max(0, Math.min(_var.height, m[1])) - _var.transform.y) / _var.transform.k;
                  origin[0] = (origin[0] - _var.transform.x) / _var.transform.k;
                  origin[1] = (origin[1] - _var.transform.y) / _var.transform.k;
                  bounds = m[0] < origin[0] && m[1] < origin[1] ? [[m[0], m[1]], [origin[0], origin[1]]] : [[origin[0], origin[1]], [m[0], m[1]]];
                  dx = bounds[1][0] - bounds[0][0];
                  dy = bounds[1][1] - bounds[0][1];
                  x = (bounds[0][0] + bounds[1][0]) / 2;
                  y = (bounds[0][1] + bounds[1][1]) / 2;
                  if (Math.abs(origin[0] - m[0]) > 5 && Math.abs(origin[1] - m[1]) > 5) {
                    transform = _var.transform;
                    transform.k = .9 / Math.max(dx / _var.width, dy / _var.height);
                    transform.k = transform.k < 1 ? 1 : transform.k > 6 ? 6 : transform.k;
                    transform.x = _var.width / 2 - transform.k * x;
                    transform.y = _var.height / 2 - transform.k * y;
                    if (isFinite(transform.k) && isFinite(transform.x) && isFinite(transform.y)) {
                      _var.transform = transform;
                      _var.ticked();
                      _var.container.canvas.call(_var.zoom.transform, d3.zoomIdentity.translate(_var.transform.x, _var.transform.y).scale(_var.transform.k));
                      _var.buttons.reset.style('display', _var.transform.k === 1 ? 'none' : 'inline-block');
                    }
                  }
                  _var.container.rect.svg.select(".brush").call(_var.brush.move, null);
                }
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.brush.on("brush", _var.brushstarted).on("brush", _var.brushed).on("end", _var.brushended);
              _var.container.rect.svg.select("g.brush").call(_var.brush);
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
