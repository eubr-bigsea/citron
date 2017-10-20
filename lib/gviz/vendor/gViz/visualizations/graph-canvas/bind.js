'use strict';

gViz.vis.graph.bind = function () {
  "use strict";

  var _var, action, animation, collection, el, main, obj, validate;
  _var = void 0;
  animation = 900;
  action = 'mouse';
  collection = void 0;
  el = void 0;
  obj = void 0;
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
            case 'resize':
              _var.resize = function () {
                $("[data-canvas='graph-canvas']").css('height', parseFloat($(window).outerHeight()) - parseFloat($('.canvas-wrapper').offset().top) - 15 + "px");
                _var.height = (typeof height !== "undefined" && height !== null ? height : _var.container.jq.outerHeight()) - (_var.margin.top + _var.margin.bottom);
                _var.width = (typeof width !== "undefined" && width !== null ? width : _var.container.jq.outerWidth()) - (_var.margin.left + _var.margin.right);
                _var.container.canvas.attr('width', _var.width).attr("height", _var.height);
                _var.container.rect.svg.attr('width', _var.width).attr("height", _var.height);
                _var.container.drag.d3canvas.attr('width', _var.width).attr("height", _var.height);
                _var = gViz.vis.graph.brush()._var(_var).action('reset').run();
                _var = gViz.vis.graph.brush()._var(_var).action('bind').run();
                return _var.simulation.restart();
              };
              _var.resizeTimer = setTimeout(function () {
                return _var.resize();
              }, 250);
              _var.resizeFunction = function (d) {
                clearTimeout(_var.resizeTimer);
                return _var.resizeTimer = setTimeout(function () {
                  return _var.resize();
                }, 250);
              };
              d3.select(window).on('resize', _var.resizeFunction);
              break;
            case 'mouse':
              _var.mousemove = function () {
                var e, m, node;
                e = this;
                m = d3.mouse(e);
                m[0] = (Math.max(0, Math.min(_var.width, m[0])) - _var.transform.x) / _var.transform.k;
                m[1] = (Math.max(0, Math.min(_var.height, m[1])) - _var.transform.y) / _var.transform.k;
                node = _var.simulation.find(m[0], m[1], 25);
                if (node != null && !_var.selection.dragging) {
                  _var.simulation.stop();
                  _var.selection.globalAlpha = .1;
                  _var.selection.hover = node;
                  _var.ticked();
                  return _var = gViz.vis.graph.tooltip()._var(_var).action('show').node(node).run();
                } else {
                  if (!_var.selection.dragging) {
                    _var.simulation.restart();
                  }
                  _var.selection.globalAlpha = Object.keys(_var.selection.clicked).length === 0 && Object.keys(_var.selection.searched).length === 0 ? 1 : .1;
                  _var.selection.hover = void 0;
                  _var.ticked();
                  return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
                }
              };
              _var.container.d3.selectAll('canvas').on("mousemove", _var.mousemove);
              _var.mouseout = function (d) {
                _var.selection.globalAlpha = Object.keys(_var.selection.clicked).length === 0 && Object.keys(_var.selection.searched).length === 0 ? 1 : .1;
                _var.selection.hover = void 0;
                _var.ticked();
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              };
              _var.container.d3.selectAll('canvas').on("mouseout", _var.mouseout);
              _var.container.d3.selectAll('canvas').on("mouseover", _var.mouseout);
              _var.dblclick = function () {
                var e, m, node;
                e = this;
                m = d3.mouse(e);
                m[0] = (Math.max(0, Math.min(_var.width, m[0])) - _var.transform.x) / _var.transform.k;
                m[1] = (Math.max(0, Math.min(_var.height, m[1])) - _var.transform.y) / _var.transform.k;
                node = _var.simulation.find(m[0], m[1], 25);
                if (node != null) {
                  if (_var.selection.clicked[node.id] != null) {
                    delete _var.selection.clicked[node.id];
                    _var.selection.neighbours = {};
                    Object.keys(_var.selection.clicked).forEach(function (key) {
                      return Object.keys(_var.selection.clicked[key].neighbours).forEach(function (nbours) {
                        return _var.selection.neighbours[nbours] = _var.selection.clicked[key].neighbours[nbours];
                      });
                    });
                    _var.selection.globalAlpha = Object.keys(_var.selection.clicked).length === 0 || Object.keys(_var.selection.searched).length === 0 ? 1 : .1;
                  } else {
                    _var.selection.clicked[node.id] = node;
                    Object.keys(node.neighbours).forEach(function (nbours) {
                      return _var.selection.neighbours[nbours] = node.neighbours[nbours];
                    });
                    _var.selection.globalAlpha = .2;
                  }
                  return _var.ticked();
                }
              };
              _var.container.d3.selectAll('canvas').on("dblclick", _var.dblclick);
              break;
            case 'list-items':
              d3.selectAll(".item-selection-list .item-selection-list-item").on("mouseover", function () {
                var id, node;
                id = $(this).attr("data-id");
                node = _var.data.nodes.filter(function (d) {
                  return d.id === id;
                });
                if (node.length !== 0) {
                  _var.simulation.stop();
                  _var.selection.globalAlpha = .1;
                  _var.selection.hover = node[0];
                  _var.ticked();
                  return _var = gViz.vis.graph.tooltip()._var(_var).action('show').node(node[0]).run();
                }
              });
              d3.selectAll(".item-selection-list .item-selection-list-item").on("mouseout", function (d) {
                _var.simulation.restart();
                return _var = gViz.vis.graph.tooltip()._var(_var).action('hide').run();
              });
              _var.selection.globalAlpha = Object.keys(_var.selection.clicked).length === 0 && Object.keys(_var.selection.searched).length === 0 ? 1 : .1;
              _var.selection.hover = void 0;
              _var.ticked();
              break;
            case 'buttons':
              _var.buttons.highlight.on('click', function () {
                _var.selection = {
                  hover: void 0,
                  clicked: {},
                  searched: {},
                  searched: {},
                  neighbours: {},
                  globalAlpha: 1,
                  dragging: false
                };
                return _var.ticked();
              });
              _var.buttons.reset.on('click', function () {
                _var.transform = {
                  k: 1,
                  x: _var.margin.left,
                  y: _var.margin.top
                };
                _var.container.canvas.call(_var.zoom.transform, d3.zoomIdentity.translate(_var.transform.x, _var.transform.y).scale(_var.transform.k));
                _var.ticked();
                return _var.buttons.reset.style('display', _var.transform.k === 1 ? 'none' : 'inline-block');
              });
              _var.buttons.in_out.on('click', function () {
                var center, direction, extent, factor, l, target_zoom, transform, translate0, view;
                direction = 1;
                factor = 0.5;
                target_zoom = 1;
                center = [_var.width / 2, _var.height / 2];
                extent = [1, 6];
                transform = _var.transform;
                translate0 = [];
                l = [];
                view = {
                  x: transform.x,
                  y: transform.y,
                  k: transform.k
                };
                direction = this.id === 'zoom-in' ? 1 : -1;
                target_zoom = _var.transform.k * (1 + factor * direction);
                if (target_zoom < extent[0]) {
                  target_zoom = extent[0];
                } else if (target_zoom > extent[1]) {
                  target_zoom = extent[1];
                }
                translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
                view.k = target_zoom;
                l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];
                view.x += center[0] - l[0];
                view.y += center[1] - l[1];
                _var.interpolateZoom({
                  x: view.x,
                  y: view.y,
                  k: view.k
                });
                return _var.buttons.reset.style('display', target_zoom === 1 ? 'none' : 'inline-block');
              });
              _var.buttons.actions.on('click', function () {
                var id;
                id = $(this).attr('id');
                _var.zoomOpts.mode = id;
                _var.buttons.actions.classed('active', function (d) {
                  return $(this).attr('id') === id;
                });
                d3.select("[data-canvas='graph-canvas']").attr("data-action", id);
                if (id === 'zoom') {
                  return _var.container.d3.select('svg.canvas-rect').moveToFront();
                } else if (id === 'drag') {
                  return _var.container.d3.select('canvas.canvas-drag').moveToFront();
                } else {
                  return _var.container.d3.select('canvas.canvas-graph').moveToFront();
                }
              });
          }
      }
    }
    return _var;
  };
  ['_var', 'action', 'animation', 'collection'].forEach(function (key) {
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
