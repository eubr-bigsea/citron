// Initialize the visualization class
gViz.vis.time.scale = function() {
  "use strict";

  // Get attributes values
  var _var      = undefined;
  var animation = 900;
  var action    = 'create';
  var metric    = 'value';

  // Validate attributes
  var validate = function(step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          switch (action) {

            case 'update-domain':

              // Initialize variables
              let min, max, diff, extent;

              // Update data
              _var.data = _var._data//.filter(d => d._epoch >= _var.bounds[0] && d._epoch <= _var.bounds[1])

              // Get bounds and extent
              _var.bounds = d3.extent(_var._data, d => d._epoch);

              // Set domain
              _var.x.domain(_var.bounds);
              if(_var._x === undefined) _var._x = _var.x;

              // Update y domain
              min  = d3.min(_var.data, d => d3.min(Object.keys(d.series).map((k) => { return d.series[k].value; })));
              max  = d3.max(_var.data, d => d3.max(Object.keys(d.series).map((k) => { return d.series[k].value; })));
              if(isNaN(min) && isNaN(max)) { min = 0; max = 0.1; }
              diff = Math.abs(max - min) * .1;
              _var.y.domain([(min - diff), (max + diff)]);

              break;
          }
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','animation','action','value'].forEach(function(key) {

    // Attach variables to validation function
    validate[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return validate;
    };

    // Attach variables to main function
    return main[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = _ => main('run');

  return main;
};
