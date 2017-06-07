'use strict';

gViz.vis.map.addLine = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var service = undefined;
  var coords = undefined; // Must be supplied as an array
  var tooltip = undefined;

  // Line options
  var colour = "blue";
  var weight = 10;
  var opacity = 1;
  var lineJoin = "round";

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        // In order to add a point, a coordinate must be
        // provided
        if(!coords) {
          console.log("ERROR: Coordinates field is empty");
          return false;
        }

        if(coords.length == 1) {
          console.log(`ERROR: Must have more than one coordinate in
            order to draw a line`);
          return false;
        }

        // The service to which the point is going to be
        // added to must be specified
        if(!service) {
          console.log("ERROR: Service must be specified");
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

          if(!_var.services[service]) {
            _var.services[service] = L.layerGroup().addTo(_var.map);
          }

          var line = L.polyline(coords, {
            color: colour,
            weight: weight,
            opacity: opacity,
            lineJoin: lineJoin
          });

          if(tooltip) { line.bindPopup(tooltip) };

          _var.services[service].addLayer(line);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
 ['_var', 'coords', 'service', 'tooltip', 'colour', 'weight', 'opacity',
  'lineJoin'].forEach(function (key) {

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
