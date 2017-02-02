'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Initialize the visualization class
gViz.vis.time.axis = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var animation = 900;
  var action = 'create';
  var ticks = [];
  var type = 'y';

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
          var _ret = function () {

            switch (action) {

              case 'create':

                // Initialize variables
                var x_ticks = void 0,
                    y_ticks = void 0;

                // Switch action to ticks
                action = 'ticks';

                // Get ticks for x
                type = 'x';
                x_ticks = main('run');

                // Create and update X axis
                _var.x_axis = _var.g.selectAll(".x.axis").data(['x']);
                _var.x_axis.exit().remove();
                _var.x_axis = _var.x_axis.enter().append('g').attr("class", "x axis").merge(_var.x_axis);
                _var.x_axis.call(_var.xAxis.tickFormat(gViz.helpers.date.format.hms.format)).attr("transform", 'translate(0,' + _var.height + ')').selectAll('.tick text').attr('transform', function (d, i) {
                  if (i == 0) {
                    return 'translate(' + this.getBBox().width * .5 + ',0)';
                  } else if (i == x_ticks.length - 1) {
                    return 'translate(' + -this.getBBox().width * .5 + ',0)';
                  } else {
                    return 'translate(0,0)';
                  }
                });

                // Create and update Y axis
                type = 'y';
                y_ticks = main('run');
                _var.y_axis = _var.g.selectAll(".y.axis").data(['y']);
                _var.y_axis.exit().remove();
                _var.y_axis = _var.y_axis.enter().append('g').attr("class", "y axis").merge(_var.y_axis);
                _var.y_axis.call(_var.yAxis.tickValues(y_ticks).tickFormat(gViz.helpers.number.format.s)).selectAll('.tick text').attr('text-anchor', 'end').attr('transform', function (d, i) {
                  switch (i) {
                    case 0:
                      return 'translate(-5,' + -(this.getBBox().height / 2) + ')';
                    case y_ticks.length - 1:
                      return "translate(-5,1)";
                    default:
                      return "translate(-5,-1)";
                  }
                });

                // Path domain first
                _var.y_axis.selectAll('.domain, .tick').sort(d3.ascending);

                break;

              case 'ticks':

                return {
                  v: function () {
                    switch (type) {

                      case 'x':

                        // Get number of bins, size and ticks
                        var bins = d3.max([3, parseInt(_var.width / 100, 10)]);
                        var size = (_var.x.domain()[1] - _var.x.domain()[0]) / bins;
                        var ticks = [];

                        // Generate bins
                        __range__(0, bins, true).forEach(function (d, i) {
                          return ticks.push(new Date(parseInt(_var.x.domain()[0] + size * i)));
                        });

                        return ticks;

                      case 'y':

                        // Get number of bins, size and ticks
                        var bins = d3.max([3, parseInt(_var.height / 25, 10)]);
                        var size = Math.abs(_var.y.domain()[1] - _var.y.domain()[0]) / bins;
                        var ticks = [];

                        // Generate bins
                        __range__(0, bins, true).forEach(function (d, i) {
                          return ticks.push(_var.y.domain()[0] + size * i);
                        });

                        return ticks;
                    }
                  }()
                };

                break;
            }
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation', 'action', 'ticks', 'type'].forEach(function (key) {

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

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
