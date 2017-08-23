// Initialize the visualization class
gViz.vis.pieChart.legend = function () {
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

          // Get outer wrapper
          var outerWrapper = _var.container.d3.closest('.gViz-outer-wrapper');

          // Set margin left and display style
          outerWrapper.select('.legend-wrapper, .legend-wrapper-full')
            .style('padding-left', _var.margin.left + "px")
            .style('display', _var.data.legend == null || _var.data.legend.isVisible == null || _var.data.legend.isVisible !== true ? 'none' : 'block')

          // Initialize string
          var string = "";
          var stringObj = {};

          // Iterate nodes
          _var.data.data.forEach(function(d, i) {

            // Get color
            var fillColor = d.color == null ? "#666" : d.color;
            var strokeColor = d.color == null ? "#666" : d.color;
            var mutedColor = d._color == null ? "#bbb" : d._color;
            var shape = 'rect';
            var legend = _var.data.legend != null && _var.data.legend.text != null ? _var.data.legend.text : "{{name}}";
            var legendStr = "";

            // Add rect for obj
            if(_var.muted) {
              legendStr += "<span class='"+shape+"' style='background-color:"+mutedColor+"; margin-right: -2px;'></span>";
            }
            legendStr += "<span class='"+shape+"' style='background-color:"+fillColor+" ; '></span><span class='name'>";
            legendStr += gViz.shared.helpers.text.replaceVariables(legend, d);
            legendStr += "</span>";

            // If the legend str wasnt computed, add to legend
            if(stringObj[legendStr] == null) {
              stringObj[legendStr] = true;
              string += legendStr;
            }

          });

          // Update legend
          outerWrapper.select('.legend').html(string);

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
