'use strict';

gViz.vis.map.addMarkers = function () {
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

          _var.markers["cities"] = L.layerGroup().addTo(_var.map);

          Object.keys(_var._data).forEach(function(key) {
            var city = _var._data[key];

            var coords = L.latLng(city["lat"], city["lon"]);

            var marker = L.marker(coords, {
              icon: gViz.helpers.map_markers["blue"]
            });

            marker.bindPopup(city["city"]);

            _var.markers["cities"].addLayer(marker);

          });

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
