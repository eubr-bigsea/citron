'use strict';

gViz.vis.line_chart.draw = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'draw';
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

      switch (step) {

        // Build entire visualizations
        case 'run':

          switch (action) {

            case 'draw':

              var valueline = d3.line()
                .x(function(d) { return _var.xScale(d["xAxis"]); })
                .y(function(d) { return _var.yScale(d["yAxis"]); });

              _var.line = _var.g.selectAll('.line').data([_var._data]);
              _var.line.exit().remove();
              _var.line = _var.line.enter().append("path").attr("class", 'line').merge(_var.line);

              _var.line
      					.attr("d", valueline);

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action', 'animation'].forEach(function (key) {

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

  // Execute the specific called function
  main.run = function (_) {
    return main('run');
  };

  return main;
};
