// Initialize the visualization class
gViz.vis.map.style = function () {
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

          // Set polygons shape color
          _var.polygonShapeColor = function() {
            var obj = _var.heatData[d.properties[_var.data.heat != null && _var.data.heat.shapeId != null ? _var.data.heat.shapeId : "id"]];
            return obj == null ? "#eee" : (obj.color != null ? obj.color : _var.heatScale(+obj.value));
          }

          // Set polygon shape opacity
          _var.polygonShapeOpacity = function(d) {
            return _var.data.heat != null && _var.data.heat.mapOpacity != null ? +_var.data.heat.mapOpacity : 1;
          }

          // Set polygon shape stroke color
          _var.polygonShapeStrokeColor = function(d) {
            return _var.data.heat != null && _var.data.heat.mapStrokeColor != null ? _var.data.heat.mapStrokeColor : "#FFF";
          }

          // Set bar shape color
          _var.barShapeColor = function(d) {
            return _var.data.bars != null && _var.data.bars.mapColor != null ? _var.data.bars.mapColor : "#DDD";
          }

          // Set bar shape opacity
          _var.barShapeOpacity = function(d) {
            return _var.data.bars != null && _var.data.bars.mapOpacity != null ? +_var.data.bars.mapOpacity : 0.8;
          }

          // Set bar shape stroke color
          _var.barShapeStrokeColor = function(d) {
            return _var.data.bars != null && _var.data.bars.mapStrokeColor != null ? _var.data.bars.mapStrokeColor : "#FFF";
          }

          // Set bar width
          _var.barWidth = function(d) {
            return _var.data.bars != null && _var.data.bars.barWidth != null ? _var.data.bars.barWidth : 3;
          }

          // Set bottom bar y
          _var.barY = function(d) {
            var bottomBarHeight = _var.data.bars != null && _var.data.bars.bottomBarHeight != null ? -_var.data.bars.bottomBarHeight : -3;
            return bottomBarHeight - _var.barScale(+d.value);
          }

          // Set bottom bar height
          _var.barHeight = function(d) {
            var bottomBarHeight = _var.data.bars != null && _var.data.bars.bottomBarHeight != null ? -_var.data.bars.bottomBarHeight : -3;
            return _var.barScale(+d.value);
          }

          // Set bar color
          _var.barColor = function(d) {
            return d.color != null ? d.color : (_var.data.bars != null && _var.data.bars.barColor != null ? _var.data.bars.barColor : "#999");
          }

          // Set bottom bar y
          _var.bottomBarY = function(d) {
            return _var.data.bars != null && _var.data.bars.bottomBarHeight != null ? -_var.data.bars.bottomBarHeight : -3;
          }

          // Set bottom bar height
          _var.bottomBarHeight = function(d) {
            return _var.data.bars != null && _var.data.bars.bottomBarHeight != null ? _var.data.bars.bottomBarHeight : 3;
          }

          // Set bottom bar color
          _var.bottomBarColor = function(d) {
            return _var.data.bars != null && _var.data.bars.bottomBarColor != null ? _var.data.bars.bottomBarColor : "#999";
          }


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
