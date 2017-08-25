gViz.vis.histogram.xScale = function () {
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

          // Define scale
          _var.x = d3.scaleLinear().range([0, _var.width]);

          // Define aux variables
          var min = null,
              max = null,
              diff = null;

          // Get bounds
          data.forEach(function(d) {
            if(min == null || min > +d._x) { min = +d._x; }
            if(max == null || max < +d._x) { max = +d._x; }
          });

          // Get axis target
          if(_var.data.x != null && _var.data.x.target != null && !isNaN(+_var.data.x.target)) {
            _var.xTarget = +_var.data.x.target;
            if(min == null || min > +_var.data.x.target) { min = +_var.data.x.target; }
            if(max == null || max < +_var.data.x.target) { max = +_var.data.x.target; }
          }

          // Check for default values
          if(isNaN(min)) { min = 0; }
          if(isNaN(max)) { max = 1; }

          // Get diff
          var diff = Math.abs(max - min) === 0 ? Math.abs(max * 0.1) : 0;

          // Set x domain
          _var.x.domain([(min == 0 ? min : min - diff), max + diff]);

          // Get axis format with prefix and sufix
          var prefix = _var.data.x != null && _var.data.x.prefix != null ? _var.data.x.prefix : "";
          var sufix  = _var.data.x != null && _var.data.x.sufix != null ? _var.data.x.sufix : "";

          // Set format
          if(_var.data.x.type === 'time') {
            _var.xFormat = function(d) { return prefix + d3.timeFormat(_var.data.x.format)(d) + sufix; };
          } else {
            var format = _var.data.x.format == null || _var.data.x.format === '' ? gViz.shared.helpers.number.locale : d3.format(_var.data.x.format);
            _var.xFormat = function(d) { return prefix + format(+d) + sufix; };
          }

          // Get x axis ticks
          var numBins = d3.max([3, parseInt(_var.width / 100, 10)]);

          // Set the parameters for the histogram
          _var.histogram = d3.histogram()
            .value(function(d) { return +d._x; })
            .domain(_var.x.domain())
            .thresholds(_var.x.ticks(numBins));

          // Get bins from histogram layout
          _var.bins = _var.histogram(_var.data.data);

          //_var.xTicks = [];
          //d3.range(bins + 1).forEach(function(i) { _var.xTicks.push((_var.x.domain()[0] + size * i).toFixed(2)); });

          //// Add extra values
          //if(_var.x.domain()[1] > 0 && _var.x.domain()[0] < 0) { _var.xTicks.push(0); }
          //if(_var.xTarget != null) { _var.xTicks.push(_var.xTarget); }

          // Define axis
          //_var.xAxis = d3.axisBottom(_var.x).tickValues(_var.xTicks).tickPadding(10).tickFormat(_var.xFormat);
          _var.xAxis = d3.axisBottom(_var.x).tickPadding(10).tickFormat(_var.xFormat);

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
