// Initialize the visualization class
gViz.vis.map.events = function () {
  "use strict";

  // Get attributes values
  var _var       = null;
  var action     = 'mouseover';
  var components = null;
  var node       = null;
  var _node      = null;
  var nodeSel    = null;

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

        // Run code
        case 'run':

          if(_var.mode["bars"]) {
            // Set shapes and bars
            var bars   = _var.g.select('.chart-elements').selectAll('.bar, .bottom-bar');

            // Store node
            _node = node;

            switch (action) {

              case 'mouseover':

                // If the node exists
                if(node != null) {

                  // Fade bars
                  bars.transition()
                    .style('opacity', function(g) { return g.id === node.id ? 1 : 0.2; })
                    .style("filter", function(g) { return g === node ? "url(#"+_var.shadowId+")" : ""; })

                  // Set x and y position
                  var y = 70;
                  var x = 0;
                  if(_var.data.title != null && _var.data.title !== "") { y += 35; }

                  // Initialize tooltip object
                  var tooltipObj = { properties: {} };

                  // Set color
                  tooltipObj.color =_var.barColor(node);

                  // Set node attributes to tooltip obj
                  Object.keys(node).forEach(function(k) { tooltipObj[k] = node[k]; });

                  // Set bars component
                  var tooltip = _var.data.tooltip;
                  gViz.shared.visualComponents.tooltipTable()
                    ._var(_var)
                    .body(tooltip != null && tooltip.body != null ? tooltip.body : "")
                    .borderColor(_var.barColor(node))
                    .hasImg(tooltip != null && tooltip.hasImg === true)
                    .left(x)
                    .muted(tooltip != null && tooltip.muted != null && tooltip.muted === true)
                    .obj(tooltipObj)
                    .target(_var.container.d3.closest('.gViz-outer-wrapper').select('.gViz-map-table-tooltip'))
                    .title(tooltip != null && tooltip.title != null ? tooltip.title : "")
                    .top(y)
                    .run();

                }

                break;

              case 'mouseout':

                // Reset opacity and filter
                bars.transition().style('opacity', 1).style("filter", "")

                // Set bars component
                gViz.shared.visualComponents.tooltipTable()
                  ._var(_var)
                  .action("hide")
                  .target(_var.container.d3.closest('.gViz-outer-wrapper').select('.gViz-map-table-tooltip'))
                  .run();

              break;
            }
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','action','components','node','nodeSel'].forEach(function (key) {

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
