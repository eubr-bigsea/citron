// Initialize the visualization class
gViz.vis.map.heatLayer = function () {
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

          // default values
          _var.heatColors = _var.heatColors ? _var.heatColors : ["#bbb","#444"];

          if(_var.mode["heat"]) {
            // Map heat colors entry
            if(_var.data.heat == null || _var.data.heat.colors == null || _var.data.heat.colors.length === 0) { _var.heatColors = ["#bbb","#444"]; }
            else {

              // Map data for d3 color
              var colors = _var.data.heat.colors.map(function(d) { return d3.color(d); }).filter(function(d) { return d != null; });

              if(colors.length === 1) { _var.heatColors = [colors[0], colors[0].darker(3)]; }
              if(colors.length > 1) { _var.heatColors = colors; }
            }

            // Initialize scale
            _var.heatScale = d3.scaleLinear().range(_var.heatColors);

            // Initialize hash values
            _var.heatData = {}

            // Define aux variables
            var min = null,
                max = null,
                diff = null;

            // Get bounds
            var data = _var.data.data;

            data.forEach(function(d) {

              // Store heat data for faster use
              _var.heatData[d.id] = d;

              // Set domain from values
              if(min == null || min > +d.value) { min = +d.value; }
              if(max == null || max < +d.value) { max = +d.value; }

            });

            // Check for default values
            if(!min) { min = 0; }
            if(!max) { max = 1; }

            // Get diff
            var diff = Math.abs(max - min) === 0 ? Math.abs(max * 0.1) : Math.abs(max - min) * 0.05;

            var ticks = _var.heatColors.length - 1;
            var interval = (max - min)/ticks;

            _var.heatBounds = [min];
            var current = min;

            while(current < max) {
              current += interval;
              _var.heatBounds.push(current);
            }

            // Set x domain
            // _var.heatBounds = [min, max];
            _var.heatScale.domain(_var.heatBounds);

            // Set format
            _var.heatFormat = gViz.shared.helpers.number.parseFormat(_var.data == null ? null : _var.data.heat);
            // Creates layer if it does not exist
            _var.heatLayer = L.layerGroup().addTo(_var.map);
            _var.heatLayer.clearLayers();

            var gradient = {
              0.0: _var.heatScale(0.0),
              0.1: _var.heatScale(0.1),
              0.2: _var.heatScale(0.2),
              0.3: _var.heatScale(0.3),
              0.4: _var.heatScale(0.4),
              0.5: _var.heatScale(0.5),
              0.6: _var.heatScale(0.6),
              0.7: _var.heatScale(0.7),
              0.8: _var.heatScale(0.8),
              0.9: _var.heatScale(0.9),
              1.0: _var.heatScale(1.0),
            };

            var points = _var.data.data.map(function(d) { return [d["lat"], d["lon"]]; });

            _var.heat = L.heatLayer(points, {
              gradient: gradient,
              minOpacity: 0.25,
            });

            _var.heatLayer.addLayer(_var.heat);
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
