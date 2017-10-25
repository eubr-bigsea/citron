gViz.vis.areaChart.parse = function () {
  "use strict";

  // Get attributes values
  var _var = null;

  // Validate attributes
  var validate = function (step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Iterate over data
          _var.data.data.forEach(function(d) {

            // Iterate over values
            d.values.forEach(function(v) {

              // Parse values
              v._x = _var.data.x.type === 'time' ? d3.timeParse(_var.data.x.parseFormat)(v.x).getTime() : +v.x;
              v._y = +v.y;

            });

            // Sort values
            d.values = d.values.sort(function(a,b) { return d3.ascending(a._x, b._x); });

          });

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var'].forEach(function (key) {

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
