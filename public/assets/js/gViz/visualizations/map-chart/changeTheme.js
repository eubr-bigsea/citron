'use strict';

gViz.vis.map.changeTheme = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var theme = undefined;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        // In order to add a point, a coordinate must be
        // provided
        if(!theme) {
          console.log("ERROR: New theme should be specified");
          return false;
        }

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

          // Reads new theme
          let newTheme = _var.tiles[theme];

          // Removes old theme and adds new one
          _var.map.removeLayer(_var.currentTheme);
          _var.map.addLayer(newTheme);

          // Updates current theme
          _var.currentTheme = newTheme;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
 ['_var', 'theme'].forEach(function (key) {

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
