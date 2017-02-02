'use strict';

gViz.vis.bar_chart.scales = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'create';
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

            case 'create':

              _var.xScale = d3.scaleBand().range([0, _var.width]).padding(0.1);
              _var.xScale.domain(_var._data.map(function (d) {
                return d["discrete"];
              }));

              _var.yScale = d3.scaleLinear().range([_var.height, 0]);
              _var.yScale.domain([0, d3.max(_var._data, function (d) {
                return d["continuous"];
              })]);

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
