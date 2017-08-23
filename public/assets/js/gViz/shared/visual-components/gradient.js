// Initialize the visualization class
gViz.shared.visualComponents.gradient = function() {
  "use strict";

  // Get attributes values
  var _var       = undefined;
  var id         = `vis-gradient-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var action     = 'draw';
  var colors     = [{offset:"0%", color: "#333"},{offset:"100%", color: "#FFF"}];
  var direction  = "vertical";
  var gType      = "linear";
  var x1         = null;
  var x2         = null;
  var y1         = null;
  var y2         = null;
  var wrap       = null;

  // Validate attributes
  var validate = function(step) {
    switch (step) {
      case 'run': return wrap != null;
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

            case 'draw':

              switch (gType) {

                // Build entire visualizations
                case 'linear':

                  // Set directions
                  if(direction === 'horizontal') {
                    x1 = "0%";
                    y1 = "0%";
                    x2 = "100%";
                    y2 = "0%";
                  } else {
                    x1 = "0%";
                    y1 = "0%";
                    x2 = "0%";
                    y2 = "100%";
                  }

                  // Remove special chars from id
                  id = gViz.shared.helpers.text.removeSpecial(id);

                  // Update gradients
                  var grad = wrap.selectAll(`#${id}.grad`).data([id]);
                  grad.exit().remove();
                  grad = grad.enter().append("linearGradient").attr('id', function(d) { return `${id}`; }).attr("class", 'grad').merge(grad);
                  grad
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", x2)
                    .attr("y2", y2)
                    .each(function(g) {

                      // Update gradient stops
                      var stop = d3.select(this).selectAll(`stop`).data(colors);
                      stop.exit().remove();
                      stop = stop.enter().append("stop").merge(stop);
                      stop
                        .attr("offset", function(d) { return d.offset; })
                        .attr("stop-color", function(d) { return d.color; });

                    });

                  break;

              }
              break;

            case 'clean':

              // Clean all gradients from wrap
              wrap.selectAll('.grad').remove();

              break;

          }
          break;
      }
    }
  };

  // Exposicao de variaveis globais
  ['_var','id','action','colors','direction','gType','x1','y1','x2','y2','wrap'].forEach(function(key) {

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
