// Initialize the visualization class
gViz.vis.map.zoom = function () {
  "use strict";

  // Get attributes values
  var _var = null;

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

          // Reset visualization zoom
          _var.container.d3.closest('.gViz-outer-wrapper').select("[data-action='reset']").on('click', function(d) {
            _var.map.setView(_var.firstPoint, _var.firstZoom);
          });

          // Bind zoom in
          _var.container.d3.closest('.gViz-outer-wrapper').select("[data-action='zoom-in']").on('click', function(d) {
            _var.map.zoomIn();
          });

          // Bind zoom out
          _var.container.d3.closest('.gViz-outer-wrapper').select("[data-action='zoom-out']").on('click', function(d) {
            _var.map.zoomOut();
          });

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var'].forEach(function (key) {

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
