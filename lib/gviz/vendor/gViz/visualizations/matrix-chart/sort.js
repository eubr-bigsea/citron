'use strict';

gViz.vis.matrix_chart.sort = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'sort';
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
          (function () {

            switch (action) {

              case 'sort':

                // Binds button to sort function
                d3.select("#order").on("change", function () {
                  var value = document.getElementById("order").value;
                  sort(value);
                });

                var sort = function sort(value) {
                  // Updates scales domain
                  _var.xScale.domain(_var.orders.x[value]);
                  _var.yScale.domain(_var.orders.y[value]);

                  var t = _var.g.transition().duration(500);

                  // Updates Rows Lines
                  t.selectAll('.' + _var._class + '.row.line').attr("transform", function (d, i) {
                    return "translate(0," + _var.yScale(i) + ")";
                  });

                  // Updates Rows Labels
                  t.selectAll('.' + _var._class + '.row.text').attr("transform", function (d, i) {
                    return "translate(0," + (_var.yScale(i) + _var.yScale.bandwidth() / 2) + ")";
                  });

                  // Updates Columns Lines
                  t.selectAll('.' + _var._class + '.column.line').attr("transform", function (d, i) {
                    return "translate(" + _var.xScale(i) + ")";
                  });

                  // Updates Columns Labels
                  t.selectAll('.' + _var._class + '.column.text').attr("transform", function (d, i) {
                    return "translate(" + (_var.xScale(i) + _var.xScale.bandwidth() / 2) + ", 0) rotate(-90)";
                  });

                  // Updates each cell
                  t.selectAll('.' + _var._class + '.cell').attr("x", function (d) {
                    return _var.xScale(d.y);
                  }).attr("y", function (d) {
                    return _var.yScale(d.x);
                  });
                };

                break;
            }
          })();

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
