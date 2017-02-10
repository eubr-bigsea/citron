'use strict';

// Initialize the visualization class
gViz.vis.time.elements = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var animation = 900;

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
      (function () {

        switch (step) {

          // Build entire visualizations
          case 'run':

            // Initialize variables
            var ids = void 0,
                data = [],
                bounds = void 0,
                elements = void 0,
                groups = void 0,
                els = void 0,
                bg_rect = void 0,
                bg_rect_str = void 0,
                start = undefined,
                end = undefined;

            // Area constructor
            if (_var.shape === 'area') {

              _var.constructor = d3.area().x(function (d) {
                return _var._x(d.x);
              }).y0(_var.height).y1(function (d) {
                return _var.y(d.y);
              });

              // Line constructor
            } else {

              _var.constructor = d3.line().x(function (d) {
                return _var._x(d.x);
              }).y(function (d) {
                return _var.y(d.y);
              }).curve(d3.curveStepAfter);
            }

            // Get line names
            ids = Object.keys(_var.data[0].series);

            // Get data bounds
            bounds = _var._x.domain();

            // Filter data
            _var.data.forEach(function (d, i) {
              if (d._epoch < bounds[0] && d._epoch < bounds[1]) {
                start = $.extend({}, d);
              } else if (d._epoch > bounds[0] && d._epoch > bounds[1]) {
                end = $.extend({}, _var.data[i - 1]);
              } else data.push(d);
            });

            // Fix bounds from start and end points
            if (start != undefined && data[0] != start) {
              start._epoch = bounds[0];
              start.date = new Date(bounds[0]);
              data.unshift(start);
            }
            if (end != undefined && data[data.length - 1] != end) {
              end._epoch = bounds[1];
              end.date = new Date(bounds[1]);
              data.push(end);
            }

            // Map data
            _var.stacked = ids.map(function (id) {
              return {
                id: id,
                name: data[0].series[id].name,
                group: data[0].series[id].group,
                sorted: d3.median(data.map(function (d) {
                  return d.series[id].value;
                })),
                values: data.map(function (d) {
                  return { date: d.date, x: d._epoch, y: d.series[id].value };
                })
              };
            }).sort(function (a, b) {
              return d3.descending(a.sorted, b.sorted);
            });

            // Element canvas
            elements = _var.g.selectAll(".chart-elements").data(["chart-elements"]);
            elements.exit().remove();
            elements = elements.enter().append("g").attr("class", "chart-elements").merge(elements);

            // Create line/area groups
            groups = elements.selectAll(".element-group").data(_var.stacked, function (d) {
              return d.id;
            });
            groups.exit().remove();
            groups = groups.enter().append("g").attr("class", "element-group").merge(groups);

            // For each element in group
            groups.each(function (e, i) {

              // Update line/area groups
              els = d3.select(this).selectAll('.' + _var.shape + '.element').data([e], function (d) {
                return d.id;
              });
              els.exit().remove();
              els = els.enter().append("path").attr("class", _var.shape + ' element').attr("d", function (d) {
                return _var.constructor(d.values);
              }).merge(els);
              els.style('stroke', function (d) {
                return _var.colors.scale(d.id);
              }).style('fill', function (d) {
                if (_var.shape === 'area') {
                  return _var.colors.scale(d.id);
                } else {
                  return 'none';
                }
              }).attr("d", function (d) {
                return _var.constructor(d.values);
              });
            });

            // Draw Background rect
            bg_rect = _var.g.selectAll("rect.bg-rect").data(["bg-rect"]);
            bg_rect.exit().remove();
            bg_rect = bg_rect.enter().insert('rect', ':first-child').attr("class", "bg-rect").merge(bg_rect);
            bg_rect.attr("x", 0).attr('y', 0).attr('width', _var.width).attr("height", _var.height);

            // Draw Stroke Background rect
            bg_rect_str = elements.selectAll("rect.bg-rect-stroke").data(["bg-rect-stroke"]);
            bg_rect_str.exit().remove();
            bg_rect_str = bg_rect_str.enter().insert('rect', ':first-child').attr("class", "bg-rect-stroke").merge(bg_rect_str);
            bg_rect_str.attr("x", 0).attr('y', 0).attr('width', _var.width).attr("height", _var.height);

            break;
        }
      })();
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation'].forEach(function (key) {

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

  // Executa a funcao chamando o parametro de step
  main.run = function (_) {
    return main('run');
  };

  return main;
};
