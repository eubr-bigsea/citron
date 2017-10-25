'use strict';

gViz.vis.matrix_chart.setup = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'setup';
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

            case 'setup':

              _var.matrix = [];

              // Compute index per node.
              _var._data.rows.forEach(function (node, i) {
                node.index = i;
                node.count = 0;

                // For convention x = line and y = column. Z is the value of
                // each cell
                _var.matrix[node.index] = d3.range(_var._data.columns.length).map(function (j) {
                  return { x: i, y: j, z: 0 };
                });
              });

              // Parse Group to Int
              _var._data.columns.forEach(function (node, i) {
                node.count = 0;
                node.index = i;
              });

              // Convert links to matrix; count occurrences.
              _var._data.links.forEach(function (link) {

                // Finds ids on arrays.
                var row = $.grep(_var._data.rows, function (d) {
                  return d.id == link.row;
                });
                var row = row[0]["index"];

                var column = $.grep(_var._data.columns, function (d) {
                  return d.id == link.column;
                });
                var column = column[0]["index"];

                _var.matrix[row][column].z += link.value;
                _var._data.rows[row].count += link.value;
                _var._data.columns[column].count += link.value;
              });

              // Precompute the orders.
              _var.orders = {};

              _var.orders.y = {
                name: d3.range(_var._data.rows.length).sort(function (a, b) {
                  return d3.ascending(_var._data.rows[a].name, _var._data.rows[b].name);
                }),

                count: d3.range(_var._data.rows.length).sort(function (a, b) {
                  return _var._data.rows[b].count - _var._data.rows[a].count;
                })

              };

              _var.orders.x = {
                name: d3.range(_var._data.columns.length).sort(function (a, b) {
                  return d3.ascending(_var._data.columns[a].name, _var._data.columns[b].name);
                }),

                count: d3.range(_var._data.columns.length).sort(function (a, b) {
                  return _var._data.columns[b].count - _var._data.columns[a].count;
                })

              };

              // xScale positions each column on the x axis
              _var.xScale.domain(_var.orders.x.name);

              // yScale positions each row on the y axis
              _var.yScale.domain(_var.orders.y.name);

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
