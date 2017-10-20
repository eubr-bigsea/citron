// Initialize the visualization class
gViz.shared.visualComponents.axisGuide = function() {
  "use strict";

  // Get attributes values
  var _var       = undefined;
  var action     = "show";
  var color      = "#333";
  var height     = 0;
  var x          = 0;
  var y          = 0;
  var z          = 0;
  var left       = { x: 0, y: 0 };
  var top        = { x: 0, y: 0 };
  var value      = { x: 0, y: 0 };

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

          // Get window position
          var doc = document.documentElement;
          var offset = {
            left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            top:  (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
          };

          switch (action) {

            // Build entire visualizations
            case 'show':

              // Insert Path to axis
              var axisGuide = _var.g.selectAll(".axis-guide").data(['x','y']);
              axisGuide.exit().remove();
              axisGuide = axisGuide.enter().append('path').attr("class", "axis-guide").merge(axisGuide);
              axisGuide
                .attr('d', function(s) { return s === 'x' ? `M ${x} ${y+z} ${x} ${y+z}` : `M ${x-z} ${y} ${x-z} ${y}`; })
                .style('stroke', color)
                .transition().duration(200)
                  .attr('d', function(s) { return s === 'x' ? `M ${x} ${y+z} ${x} ${height}` : `M ${x-z} ${y} ${0} ${y}`; });

              // Insert axis guide text background rect
              var axisGuideRect = d3.select('body').selectAll(".axis-guide-rect").data(['x','y']);
              axisGuideRect.exit().remove();
              axisGuideRect = axisGuideRect.enter().append('div').attr("class", "axis-guide-rect").merge(axisGuideRect);
              axisGuideRect
                .style('opacity', 0)
                .style('background-color', color)
                .html(function(s) {
                  if(s === 'x') { return "<span style='color: " + (gViz.shared.helpers.colors.isDark(color) ? "#FFF" : "#434343") + ";'>" + value.x + "</span><span class='arrow up' style='color: " + color + ";'>▲</span>"; }
                  else { return "<span style='color: " + (gViz.shared.helpers.colors.isDark(color) ? "#FFF" : "#434343") + ";'>" + value.y + "</span><span class='arrow right' style='color: " + color + ";'>▶</span>"; }
                })
                .transition().delay(200).duration(0)
                  .style('opacity', 1)
                  .style('top',  function(s) {
                    var h = this.getBoundingClientRect().height;
                    return `${ offset.top + (s === 'x' ? top - y + z + height : top + z - h/2) }px`;
                  })
                  .style('left', function(s) {
                    var w = this.getBoundingClientRect().width;
                    return `${ offset.left + (s === 'x' ? left - w/2 : left - x - w) }px`;
                  })

              break;

            // Build entire visualizations
            case 'hide':

              // Remove axis guide elements
              _var.g.selectAll(".axis-guide").remove();
              d3.selectAll(".axis-guide-rect").remove();

              break;

          }
          break;
      }
    }
  };

  // Exposicao de variaveis globais
  ['_var','action','color','height','left','top','value','x','y','z'].forEach(function(key) {

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
