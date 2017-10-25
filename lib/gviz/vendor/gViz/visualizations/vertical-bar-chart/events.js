// Initialize the visualization class
gViz.vis.verticalBarChart.events = function () {
  "use strict";

  // Get attributes values
  var _var       = null;
  var action     = 'mouseover';
  var components = null;
  var node       = null;

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

          // Set strokes and bars
          var strokes  = _var.g.select('.chart-elements').selectAll('.stroke, .wrapper-stroke')
          var bars   = _var.g.select('.chart-elements').selectAll('.bar, .wrapper-bar')

          switch (action) {

            case 'mouseover':

              // Fade strokes
              strokes.transition().style('opacity', function(g) { return g.x === node.x ? 1 : 0.2; })

              // Fade bars
              bars.transition()
                .style('opacity', function(g) { return g.x === node.x ? 1 : 0.2; })
                .style("filter", function(g) { return g === node ? "url(#"+_var.shadowId+")" : ""; })

              // Get x and y values
              var x = _var.hasWrapper(node.wrap) ? _var.x(node.x) + _var.x.bandwidth()/2 : _var.x(node.parent) + _var.xIn(node.x) + _var.xIn.bandwidth()/2;
              var y = _var.getY(node);

              // Get left and top positions
              var left = _var.wrap.node().getBoundingClientRect().left +_var.margin.left + x;
              var top  = _var.wrap.node().getBoundingClientRect().top + _var.margin.top + y;

              // Set node color
              var nodeColor = _var.getColor(node, 'stroke');

              // Initialize tooltip object
              var tooltipObj = { color: nodeColor  };

              // Set node attributes to tooltip obj
              Object.keys(node).forEach(function(k) { tooltipObj[k] = node[k]; });

              // Set x and y values with format
              tooltipObj.x = _var.xFormat(node.x);
              tooltipObj.y = _var.yFormat(node.y);

              // Set bars component
              gViz.shared.visualComponents.tooltip()
                ._var(_var)
                .body(_var.data.tooltip != null && _var.data.tooltip.body != null ? _var.data.tooltip.body : "")
                .muted(_var.data.tooltip != null && _var.data.tooltip.muted != null && _var.data.tooltip.muted === true)
                .borderColor(nodeColor)
                .left(left)
                .hasImg(_var.data.tooltip != null && _var.data.tooltip.hasImg === true)
                .obj(tooltipObj)
                .top(top)
                .title(_var.data.tooltip != null && _var.data.tooltip.title != null ? _var.data.tooltip.title : "")
                .run();

              break;

            case 'mouseout':

              // Reset opacity and filter
              strokes.transition().style('opacity', 1)
              bars.transition().style('opacity', 1).style("filter", "")

              // Set bars component
              gViz.shared.visualComponents.tooltip()
                ._var(_var)
                .action("hide")
                .run();

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','action','components','node'].forEach(function (key) {

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
