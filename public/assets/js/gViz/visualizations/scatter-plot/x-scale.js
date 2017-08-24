// Initialize the visualization class
gViz.vis.scatterPlot.xScale = function () {
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

          // Set format
          _var.xIsDate = (_var.data.x != null && _var.data.x.type === 'time' && _var.data.x.inFormat != null && _var.data.x.outFormat != null);
          _var.xIsNumber = (_var.data.x != null && _var.data.x.type === 'number' && _var.data.x.format != null);
          var xFmt = _var.xIsDate ? 'date' : (_var.xIsNumber ? 'number' : 'text');
          _var.xFormat = gViz.shared.helpers[xFmt].parseFormat(_var.data == null ? null : _var.data.x);

          // Define scales
          _var.x = _var.xIsDate || _var.xIsNumber ? d3.scaleLinear().range([0, _var.width]) : d3.scaleBand().range([0, _var.width]).padding(0.1);

          // Define aux variables
          var min = null, max = null, diff = null;

          // Initialize domains
          _var.xDomain = {};
          var xDomain = [];

          // Get domains
          data.forEach(function(d) {
            d.values.forEach(function(v) {

              // Set parent
              v._parent = d;

              // Date value
              if(_var.xIsDate) {

                // Parse values
                v.parsedX = d3.timeParse(_var.data.x.inFormat)(v.x).getTime();
                v.formattedX = _var.xFormat(v.x);

                // Set domain
                if(min == null || min > +v.parsedX) { min = +v.parsedX; }
                if(max == null || max < +v.parsedX) { max = +v.parsedX; }

              // Number values
              } else if(_var.xIsNumber) {

                // Parse values
                v.parsedX = +v.x;
                v.formattedX = _var.xFormat(v.x);

                // Set domain
                if(min == null || min > +v.x) { min = +v.x; }
                if(max == null || max < +v.x) { max = +v.x; }

              // For ordinal scales
              } else {

                // Get ordinal values
                v.parsedX = v.x;
                v.formattedX = v.x;

                // Add id to x domain value
                if(_var.xDomain[v.x] == null) {
                  _var.xDomain[v.x] = v;
                  xDomain.push(v.x);
                }
              }

            });
          });

          // Date or number values
          if(_var.xIsDate || _var.xIsNumber) {

            // Sort values
            data.forEach(function(d) { d.values = d.values.sort(function(a,b) { return d3.ascending(a.parsedX, b.parsedX); }); });

            // Check for default values
            if(isNaN(min)) { min = 0; }
            if(isNaN(max)) { max = 1; }

            // Get diff
            var diff = Math.abs(max - min) === 0 ? Math.abs(max * 0.1) : 0;

            // Add dot fix offset
            var dotFix = 20 * Math.abs((max + diff) - (min == 0 ? min : min - diff)) / _var.width;
            min = min - dotFix;
            max = max + dotFix;

            // Set x domain
            _var.x.domain([(min == 0 ? min : min - diff), max + diff]).nice();

            // Get x axis ticks
            var bins = d3.max([3, parseInt(_var.width / 100, 10)]);

            // Define axis
            _var.xAxis = d3.axisBottom(_var.x).ticks(bins).tickPadding(10).tickFormat(_var.xIsDate ? d3.timeFormat(_var.data.x.outFormat) : _var.xFormat);

          } else {

            // Set x domain
            _var.x.domain(xDomain);

            // Define axis
            _var.xAxis = d3.axisBottom(_var.x).tickPadding(10).tickFormat(function(d) { return d; });

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
