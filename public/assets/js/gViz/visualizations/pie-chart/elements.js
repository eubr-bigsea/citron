'use strict';

// Initialize the visualization class
gViz.vis.pie_chart.elements= function () {
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

          var radius = Math.min(_var.width, _var.height) / 2;

					_var.arc = d3.arc()
						.outerRadius(radius - 10)
						.innerRadius(0);

					_var.pie = d3.pie()
						.sort(null)
						.value(function(d) { return d["value"]; });

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
