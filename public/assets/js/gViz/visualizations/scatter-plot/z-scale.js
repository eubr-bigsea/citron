// Initialize the visualization class
gViz.vis.scatterPlot.zScale = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;
  var data = [];

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

          // Define z scale
          _var.z = d3.scaleLinear().range([5, 20]);

          // Define aux variables
          var min = null,
              max = null,
              diff = null;

          // Get bounds
          data.forEach(function(d) {
            d.values.forEach(function(v) {
              if(min == null || min > +v.z) { min = +v.z; }
              if(max == null || max < +v.z) { max = +v.z; }
            });
          });

          // Check for default values
          if(isNaN(min)) { min = 0; }
          if(isNaN(max)) { max = 1; }

          // Get diff
          var diff = Math.abs(max - min) === 0 ? Math.abs(max * 0.1) : Math.abs(max - min) * 0.05;

          // Set z domain
          _var.zBounds = [min, max]; //(min == 0 ? min : min - diff), max + diff];
          _var.z.domain(_var.zBounds);

          // Set format
          _var.zFormat = gViz.shared.helpers.number.parseFormat(_var.data == null ? null : _var.data.z);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','data'].forEach(function (key) {

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
