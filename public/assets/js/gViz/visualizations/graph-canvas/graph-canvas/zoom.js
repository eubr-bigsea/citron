'use strict';

gViz.vis.graph.zoom = function () {
  "use strict";

  var _var, action, animation, main, validate;
  _var = void 0;
  animation = 900;
  action = 'build';
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
          if (_var.zoomOpts == null) {
            _var.zoomOpts = {
              mode: 'drag'
            };
          }
          _var.interpolateZoom = function (transform) {
            var self;
            self = this;
            return d3.transition().duration(200).tween("zoom", function () {
              var iScale, iTranslate;
              iTranslate = d3.interpolate([_var.transform.x, _var.transform.y], [transform.x, transform.y]);
              iScale = d3.interpolate(_var.transform.k, transform.k);
              return function (t) {
                _var.transform = {
                  k: iScale(t),
                  x: iTranslate(t)[0],
                  y: iTranslate(t)[1]
                };
                _var.container.canvas.call(_var.zoom.transform, d3.zoomIdentity.translate(_var.transform.x, _var.transform.y).scale(_var.transform.k));
                return _var.ticked();
              };
            });
          };
          _var.refresh = function (event) {
            var limits;
            if (event == null) {
              event = d3.event;
            }
            if (event != null && event.transform != null) {
              limits = {
                min_y: _var.height - _var.height * _var.transform.k,
                max_y: 0,
                min_x: _var.width - _var.width * _var.transform.k,
                max_x: 0
              };
              if (_var.zoomOpts.mode === 'zoom') {
                event.transform = _var.transform;
                _var.transform = event.transform;
                return _var.ticked();
              } else if (_var.zoomOpts.mode === 'pan') {
                _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
                if (event.transform.k === _var.transform.k) {
                  _var.transform = event.transform;
                  event.transform = _var.transform;
                  return _var.ticked();
                } else {
                  event.transform = _var.transform;
                  return _var.transform = event.transform;
                }
              } else {
                event.transform = _var.transform;
                return _var.transform = event.transform;
              }
            }
          };
          if (_var.zoom == null) {
            _var.zoom = d3.zoom().scaleExtent([1, 6]).on("zoom", _var.refresh);
          }
          _var.container.canvas.call(_var.zoom.transform, d3.zoomIdentity.translate(_var.transform.x, _var.transform.y).scale(_var.transform.k));
          _var.container.canvas.call(_var.zoom);
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
