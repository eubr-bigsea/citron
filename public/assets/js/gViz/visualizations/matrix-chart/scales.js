'use strict';

gViz.vis.matrix_chart.scales = function () {
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

              // Columns
              _var.xScale = d3.scaleBand().range([0, _var.matrix_width]);
              // Rows
              _var.yScale = d3.scaleBand().range([0, _var.matrix_height]);
              // Colour Intensity
              _var.zScale = d3.scaleLinear().domain([0, 2]).clamp(true);

              // Custom Colour Scale
              // _var.colourScale = d3.scaleLinear().domain(d3.extent(_var._data.links, function(d) { return d["value"]; }));
              // //_var.colourScale = d3.scaleLinear().domain([0, 1]);
              // _var.colourScale.range(["orange", "green"]);

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
