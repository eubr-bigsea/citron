gViz.vis.map.tiles = function() {
  "use strict";

  // Get attributes values
  var _var = undefined;

  // Validate attributes
  var validate = function validate(step) {
    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function main(step) {
    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Define tiles array
          _var.tiles = {
            "default":  L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"),
            "carto-light":  L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"),
            "carto-dark":   L.tileLayer("http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"),
            "wikimedia":    L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"),
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
