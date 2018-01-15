// Initialize the visualization class
gViz.vis.map.barScale = function () {
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

          // Initialize scale
          if(_var.mode["bars"]) {
            _var.barMaxHeight = 10 + _var.data.bars != null && !isNaN(+_var.data.bars.barMaxHeight) ? _var.data.bars.barMaxHeight : _var.height * .15;
            _var.barScale = d3.scaleLinear().range([_var.barMaxHeight, 10]);

            // Define aux variables
            var min = null,
                max = null,
                diff = null;

            // Get bounds
            data.forEach(function(d) {

              // Set domain from values
              if(min == null || min > +d.value) { min = +d.value; }
              if(max == null || max < +d.value) { max = +d.value; }

            });

            // Check for default values
            if(isNaN(min)) { min = 0; }
            if(isNaN(max)) { max = 1; }

            // Get diff
            var diff = Math.abs(max - min) === 0 ? Math.abs(max * 0.1) : Math.abs(max - min) * 0.05;

            // Set x domain
            _var.barBounds = [min, max];
            _var.barScale.domain(_var.barBounds);

            // Set format
            _var.barFormat = gViz.shared.helpers.number.parseFormat(_var.data == null ? null : _var.data.bars);
          }

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
