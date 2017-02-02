'use strict';

// Initialize the visualization class
gViz.vis.correlation_matrix.elements = function () {
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

      switch (step) {

        // Build entire visualizations
        case 'run':

          var bg_rect = undefined;

          // Updates background
          bg_rect = _var.g.selectAll('.' + _var._class + '.background').data(["bg-rect"], function (d) {
            return d;
          });
          bg_rect.exit().remove();
          bg_rect = bg_rect.enter().insert("rect", ":first-child").attr("class", _var._class + ' background').merge(bg_rect);
          bg_rect.attr("x", 0).attr("y", 0).attr("width", _var.matrix_width).attr("height", _var.matrix_height);

          // Update Rows
          _var.row = _var.g.selectAll('.' + _var._class + '.row').data(["matrix-rows"], function (d) {
            return d;
          });
          _var.row.exit().remove();
          _var.row = _var.g.enter().append('g').attr("class", _var._class + ' row').merge(_var.row);

          // Update Columns
          _var.column = _var.g.selectAll('.' + _var._class + '.column').data(["matrix-columns"], function (d) {
            return d;
          });
          _var.column.exit().remove();
          _var.column = _var.g.enter().append('g').attr("class", _var._class + ' column').merge(_var.column);

          break;
      }
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
