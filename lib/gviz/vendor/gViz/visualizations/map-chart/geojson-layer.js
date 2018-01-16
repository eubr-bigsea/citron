// Initialize the visualization class
gViz.vis.map.geoJsonLayer = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;

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

        case 'run':

          if(_var.mode["geoJSON"]) {
            // Creates layer if it does not exist
            _var.geoJsonLayer = _var.geoJsonLayer ? _var.geoJsonLayer : new L.FeatureGroup().addTo(_var.map);
            _var.geoJsonLayer.clearLayers();

            // Adds data to map
            L.geoJson(_var.data.data).addTo(_var.geoJsonLayer);

            // Fits layer
            _var.map.fitBounds(_var.geoJsonLayer.getBounds());
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','data'].forEach(function (key) {

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
