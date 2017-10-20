'use strict';

gViz.vis.map.heatLayer= function () {
  "use strict";

  // Get attributes values

  var _var = undefined;

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

          console.log("toba");

          _var.heatLayer = _var.heatLayer ? _var.heatLayer : L.layerGroup().addTo(_var.map);

          var points = Object.keys(_var._data).map(function(k) { return [_var._data[k]["lat"], _var._data[k]["lon"]]; });

          _var.heat = L.heatLayer(points, {
            // gradient: gradient,
            minOpacity: 0.25,
          }).addTo(_var.map);

          // if(_var.mode["heat"] === true) { _var.heatLayer.addLayer(_var.heat); }
          // else { _var.heatLayer.clearLayers(); }

          break;

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
