'use strict';

gViz.vis.line_chart.axis = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'create';
  var animation = 900;
  var grid = true;

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

            case 'create':

              _var.xAxis = _var.g.selectAll('.x.axis').data(["x-axis"]);
              _var.xAxis.exit().remove();
              _var.xAxis = _var.xAxis.enter().append('g').attr("class", 'x axis').merge(_var.xAxis);
              _var.xAxis.attr("transform", "translate(0," + _var.height + ")").call(d3.axisBottom(_var.xScale));

              _var.yAxis = _var.g.selectAll('.y.axis').data(["y-axis"]);
              _var.yAxis.exit().remove();
              _var.yAxis = _var.yAxis.enter().append('g').attr("class", 'y axis').merge(_var.yAxis);
              _var.yAxis.call(d3.axisLeft(_var.yScale));

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action', 'animation', 'grid'].forEach(function (key) {

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
