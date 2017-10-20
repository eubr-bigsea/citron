// Initialize the visualization class
gViz.vis.map.create = function() {
  "use strict";

  // Get attributes values
  var _var      = undefined;
  var animation = 900;
  var components = {};

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

          // Draw svg
          L.svg().addTo(_var.map);

          _var.wrap = d3.select(_var.map.getPanes().overlayPane).select("svg")
            .attr("pointer-events", "all")
            .attr('class', `map-heat-bars chart-${_var._id}`);

          // Draw g
          _var.g = _var.wrap.selectAll("g.chart-wrap").data(["chart-wrap"]); // svg:g
          _var.g.exit().remove();
          _var.g = _var.g.enter().append('g').attr('class', "chart-wrap").merge(_var.g);

          // Draw background grid
          // gViz.shared.visualComponents.backgroundGrid()
          //   .id(_var._id)
          //   .height(_var.height + _var.margin.top + _var.margin.bottom)
          //   .width(_var.width + _var.margin.left + _var.margin.right)
          //   .left(_var.margin.left)
          //   .top(_var.margin.top)
          //   .wrap(_var.container.d3)
          //   .run();

          // Draw shadow
          gViz.shared.visualComponents.shadow()
            ._var(_var)
            .wrap(_var.wrap)
            .id(_var.shadowId)
            .run();


          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','animation','components'].forEach(function(key) {

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
