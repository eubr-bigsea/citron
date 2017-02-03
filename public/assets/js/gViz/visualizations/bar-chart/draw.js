'use strict';

gViz.vis.bar_chart.draw = function () {
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

              _var.bars = _var.g.selectAll('.bar').data(_var._data);
              _var.bars.exit().remove();
              _var.bars = _var.bars.enter().append('rect').attr("class", 'bar').merge(_var.bars);

              _var.bars.attr("x", function (d) {
                return _var.xScale(d["discrete"]);
              }).attr("width", _var.xScale.bandwidth()).attr("y", function (d) {
                return _var.yScale(d["continuous"]);
              }).attr("height", function (d) {
                return _var.height - _var.yScale(d["continuous"]);
              }).style("fill", function (d, i) {
                return _var.colors.scale(i);
              });

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
