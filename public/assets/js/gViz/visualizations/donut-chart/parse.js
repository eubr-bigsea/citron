// Initialize the visualization class
gViz.vis.donutChart.parse = function () {
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

          // Set nude colors if muted
          _var.data.data.forEach(function(d, i) {
            var value = Math.floor(255 - (67/_var.data.data.length * (_var.data.data.length-i)));
            d._color = _var.muted ? "rgb("+value+","+value+","+value+")" : d.color;
          })

          // Parse metrics
          if(_var.data != null && _var.data[_var.metric] != null) {

            // Total
            _var.data[_var.metric].total = d3.sum(_var.data.data, function(d) {
              return d[_var.metric] != null && !isNaN(+d[_var.metric]) ? +d[_var.metric] : 0;
            });

            // Value
            if(['sum','median','mean','max','min'].indexOf(_var.data[_var.metric].value) !== -1) {
              _var.data[_var.metric]._value = _var.format(d3[_var.data[_var.metric].value](_var.data.data, function(d) {
                return d[_var.metric] != null && !isNaN(+d[_var.metric]) ? +d[_var.metric] : 0;
              }));
            } else { _var.data[_var.metric]._value = _var.data[_var.metric].value; }

          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var'].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = _ => main('run');

  return main;
};
