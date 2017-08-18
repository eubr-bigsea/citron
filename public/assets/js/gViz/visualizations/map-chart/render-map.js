// Initialize the visualization class
gViz.vis.map.renderMap = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;
  var animation = 900;

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

          // saves center/zoom values
          var stash = function() {

            _var.previousZoom = _var.map.getZoom();
            _var.previousCenter = _var.map.getCenter();

          };

          var topRight    = { "lat": -999, "lon": -999 };
          var bottomLeft  = { "lat": 999, "lon": 999 };

          // Calculates Centroid, top left and bottom right points
          _var.data.data.forEach(function(point) {

            if(point["lat"] > topRight["lat"]) { topRight["lat"] = point["lat"]; }
            if(point["lon"] > topRight["lon"]) { topRight["lon"] = point["lon"]; }

            if(point["lat"] < bottomLeft["lat"]) { bottomLeft["lat"] = point["lat"]; }
            if(point["lon"] < bottomLeft["lon"]) { bottomLeft["lon"] = point["lon"]; }

          });

          var bounds = L.latLngBounds(topRight, bottomLeft);

          // Removes events and map if it already exists
          if(_var.map) {
            _var.map.off();
            _var.map.remove();
            _var.heatLayer = null;
          }

          // Creates Map
          _var.map = L.map(_var.container.el, {
            minZoom: 2 ,
            attributionControl: false,
            zoomControl: false,
          });

          // First time initialization
          if(!_var.previousCenter) {

            _var.map.fitBounds(bounds);

            // Updates zoom value
            _var.zoom = _var.zoom ? _var.zoom : _var.map.getZoom();

            stash();

          }

          // Else just pan to last position
          else { _var.map.setView(_var.previousCenter, _var.previousZoom, true); }

          // Adds tiles to map
          _var.tiles[_var.tile].addTo(_var.map);

          // Stashes zoom and center values after each event
          _var.map.on("moveend", stash);
          _var.map.on("zoomend", stash);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation'].forEach(function (key) {

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
