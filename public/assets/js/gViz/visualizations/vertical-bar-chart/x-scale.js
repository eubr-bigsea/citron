// Initialize the visualization class
gViz.vis.verticalBarChart.xScale = function () {
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

          // Define scales
          _var.x = d3.scaleBand().range([0, _var.width]).paddingInner(0.05);
          _var.xIn = d3.scaleBand().padding(0.1);

          // Set format
          _var.xIsDate = (_var.data.x != null && _var.data.x.type === 'time' && _var.data.x.inFormat != null && _var.data.x.outFormat != null);
          _var.xIsNumber = (_var.data.x != null && _var.data.x.type === 'number' && _var.data.x.format != null);
          var xFmt = _var.xIsDate ? 'date' : (_var.xIsNumber ? 'number' : 'text');
          _var.xFormat = gViz.shared.helpers[xFmt].parseFormat(_var.data == null ? null : _var.data.x);

          // Initialize domains
          _var.xDomain = {};
          _var.xInDomain = {};
          _var.legendDomain = {};
          _var.legendDomainNeg = {};

          // Get domains
          data.forEach(function(d) {

            // Parse date value
            if(_var.xIsDate) {
              d.parsedName = d3.timeParse(_var.data.x.inFormat)(d.name);
              if(d.parsedName != null) { d.name = _var.xFormat(d.name); }
            }

            // Add id to x domain value
            _var.xDomain[d.x] = d;

            // Add legend
            if(_var.hasWrapper(d.wrap) && d.name != null && d.name !== "") {
              if(+d.y >= 0) { _var.legendDomain[d.x] = d; }
              else { _var.legendDomainNeg[d.x] = d; }
            }

            // Iterate over values
            d.values.forEach(function(v) {

              // Set parent id
              v.parent = d.x;

              // Parse date value
              if(_var.xIsDate) {
                v.parsedName = d3.timeParse(_var.data.x.inFormat)(v.name);
                if(v.parsedName != null) { v.name = _var.xFormat(v.name); }
              }

              // Add id to xIn domain value
              _var.xInDomain[v.x] = v;

              // Add legend
              if(+v.y >= 0) { _var.legendDomain[v.x] = v; }
              else { _var.legendDomainNeg[v.x] = v; }

            });
          });

          // Initialize domains
          var xDomain = Object.keys(_var.xDomain), xInDomain = Object.keys(_var.xInDomain);

          // Order Domains
          if(_var.xIsDate) {
            if(xDomain.filter(function(k) { return _var.xDomain[k].parsedName == null; }).length === 0) {
              xDomain = xDomain.sort(function(a,b) { return d3.ascending(_var.xDomain[a].parsedName, _var.xDomain[b].parsedName); });
            }
            if(xInDomain.filter(function(k) { return _var.xInDomain[k].parsedName == null; }).length === 0) {
              xInDomain = xInDomain.sort(function(a,b) { return d3.ascending(_var.xInDomain[a].parsedName, _var.xInDomain[b].parsedName); });
            }
          }

          // Set x and xIn domain
          _var.x.domain(xDomain);
          _var.xIn.domain(xInDomain).range([0,_var.x.bandwidth()]);

          // Define axis
          _var.xAxis = d3.axisBottom(_var.x).tickPadding(10);

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
