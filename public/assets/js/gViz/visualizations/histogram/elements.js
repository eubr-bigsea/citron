gViz.vis.histogram.elements = function () {
  "use strict";

  // Get attributes values
  var _var       = null;
  var components = null;
  var data       = null;

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

          // Element canvas
          var elements = _var.g.selectAll(".chart-elements").data(["chart-elements"]);
          elements.exit().remove();
          elements = elements.enter().append("g").attr("class", "chart-elements").merge(elements);

          // Create groups
          var groups = elements.selectAll(".element-group").data(data);
          groups.exit().remove();
          groups = groups.enter().append("g").attr("class", "element-group node").merge(groups);

          // For each element in group
          groups
            .attr("transform", function (d) { return `translate(${_var.x(d.x0)},${_var.y(d.length)})`; })
            .transition().duration(200)
              .each(function (e, i) {

                // Draw rect
                var rect = d3.select(this).selectAll("rect.node-rect").data([e]);
                rect.exit().remove();
                rect = rect.enter().append('rect').attr("class", "node-rect").merge(rect);
                rect
                  .style('fill', _var.data.x.color)
                  .attr("x", 1)
                  .attr("width", _var.x(_var.bins[0].x1) - _var.x(_var.bins[0].x0) - 1)
                  .transition().duration(200)
                    .attr("height", function(d) { return _var.height - _var.y(d.length); });

                // Draw text
                var text = d3.select(this).selectAll("text.node-text").data(e.length > 0 ? [e] : []);
                text.exit().remove();
                text = text.enter().append('text').attr("class", "node-text").merge(text);
                text
                  .attr("dy", ".75em")
                  .attr("y", 6)
                  .attr("x", (_var.x(_var.bins[0].x1) - _var.x(_var.bins[0].x0)) / 2)
                  .attr("text-anchor", "middle")
                  .text(function(d) { return gViz.shared.helpers.number.locale(d.length); });


              });

          // Draw Background rect
          var bgRectStroke = _var.g.selectAll("path.bg-rect-stroke").data(["bg-rect-stroke"]);
          bgRectStroke.exit().remove();
          bgRectStroke = bgRectStroke.enter().insert('path', ':first-child').attr("class", "bg-rect-stroke").merge(bgRectStroke);
          bgRectStroke.style('fill', 'transparent').attr("d", "M 0,"+_var.height+" "+_var.width+","+_var.height);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','components','data'].forEach(function (key) {

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
