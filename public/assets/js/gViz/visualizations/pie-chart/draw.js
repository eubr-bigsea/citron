'use strict';

gViz.vis.pie_chart.draw = function () {
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

              _var.path = _var.g.selectAll("." + _var._class + ".arc").data(_var.pie(_var._data));
              _var.path.exit().remove();
              _var.path = _var.path.enter().append("path").attr("class", _var._class + ' arc').merge(_var.path);

              // Precompute colours
              _var.colours_hash = {};

              _var._data.forEach(function(d) {
                _var.colours_hash[d["label"]] = _var.colors.scale(d["value"]);
              });

              _var.path
								.attr("d", _var.arc)
								.style("fill", function(d, i) { return _var.colours_hash[d["data"]["label"]]; })
                .each(function(d) { this._current = d; })
                .on("click", function(d) {
                   console.log(d["data"]);
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
