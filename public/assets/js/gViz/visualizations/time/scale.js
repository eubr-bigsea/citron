'use strict';

// Initialize the visualization class
gViz.vis.time.scale = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var animation = 900;
  var action = 'create';
  var metric = 'value';

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

            case 'update-domain':

              // Initialize variables
              var min = void 0,
                  max = void 0,
                  diff = void 0,
                  extent = void 0;

              // Update data
              _var.data = _var._data;

              // Get bounds and extent
              _var.bounds = d3.extent(_var._data, function (d) {
                return d._epoch;
              });

              // Set domain
              _var.x.domain(_var.bounds);
              if (_var._x === undefined) _var._x = _var.x;

              // Update y domain
              min = d3.min(_var.data, function (d) {
                return d3.min(Object.keys(d.series).map(function (k) {
                  return d.series[k].value;
                }));
              });
              max = d3.max(_var.data, function (d) {
                return d3.max(Object.keys(d.series).map(function (k) {
                  return d.series[k].value;
                }));
              });
              if (isNaN(min) && isNaN(max)) {
                min = 0;max = 0.1;
              }
              diff = Math.abs(max - min) * .1;
              _var.y.domain([min - diff, max + diff]);

              break;
          }
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation', 'action', 'value'].forEach(function (key) {

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
