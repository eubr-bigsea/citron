gViz.vis.areaChart.yScale = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;
  var data = [];

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

          // Initialize scale
          _var.y = d3.scaleLinear().range([_var.height, 0]);

          // Define aux variables
          var min = null,
              max = null,
              diff = null;

          // Get bounds
          data.forEach(function(d) {
            d.values.forEach(function(v) {
              if(min == null || min > +v._y) { min = +v._y; }
              if(max == null || max < +v._y) { max = +v._y; }
            });
          });

          // Get axis target
          if(_var.data.y != null && _var.data.y.target != null && !isNaN(+_var.data.y.target)) {
            _var.yTarget = +_var.data.y.target;
            if(min == null || min > +_var.data.y.target) { min = +_var.data.y.target; }
            if(max == null || max < +_var.data.y.target) { max = +_var.data.y.target; }
          }

          // Check for default values
          if(isNaN(min)) { min = 0; }
          if(isNaN(max)) { max = 1; }

          // Get diff
          var diff = Math.abs(max - min) === 0 ? Math.abs(max * 0.1) : Math.abs(max - min) * 0.05;

          // Set x domain
          _var.yBounds = [min, max]; //(min == 0 ? min : min - diff), max + diff];
          _var.y.domain(_var.yBounds);

          // Get axis format with prefix and sufix
          var prefix   = _var.data.y != null && _var.data.y.prefix != null ? _var.data.y.prefix : "";
          var sufix    = _var.data.y != null && _var.data.y.sufix != null ? _var.data.y.sufix : "";
          _var.yFormat = function(d) { return prefix + gViz.helpers.number.locale(d) + sufix; };

          // Get y axis ticks
          var bins = d3.max([3, parseInt(_var.height / 60, 10)]);
          var size = Math.abs(_var.y.domain()[1] - _var.y.domain()[0]) / bins;
          _var.yTicks = [];
          d3.range(bins + 1).forEach(function(i) { _var.yTicks.push((_var.y.domain()[0] + size * i).toFixed(2)); });

          // Add eytra values
          if(_var.y.domain()[1] > 0 && _var.y.domain()[0] < 0) { _var.yTicks.push(0); }
          if(_var.yTarget != null) { _var.yTicks.push(_var.yTarget); }

          // Define y axis
          _var.yAxis = d3.axisLeft(_var.y).tickPadding(10).tickFormat(_var.yFormat);

          // Update margin left and width
          _var.width += _var.margin.left;
          _var.margin.left = 5 + d3.max(_var.yAxis.scale().ticks().map(function(d) { return gViz.helpers.text.getSize(_var.yFormat(d)); }));
          _var.width -= _var.margin.left;

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
