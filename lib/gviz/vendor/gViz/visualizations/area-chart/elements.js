// Initialize the visualization class
gViz.vis.areaChart.elements = function () {
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

          // Set data array
          var _data = (data == null ? _var.data.data : data)

          // Element canvas
          var elements = _var.g.selectAll(".chart-elements").data(["chart-elements"]);
          elements.exit().remove();
          elements = elements.enter().append("g").attr("class", "chart-elements").merge(elements);

          // Create groups
          var groups = elements.selectAll(".element-group").data(_data, function(d) { return d.id; });
          groups.exit().remove();
          groups = groups.enter().append("g").attr("class", "element-group").merge(groups);
          groups.each(function(e) {

            // Draw Background rect
            var area = d3.select(this).selectAll(".area").data([e]);
            area.exit().remove();
            area = area.enter().append('path').attr("class", "area").merge(area);
            area
              .style('fill', function(d) { return d.color; })
              .attr('d', function(d) { return _var.areaConstructor(d.values); })

          });

          // Draw Background rect
          var bg_rect = _var.g.selectAll("rect.bg-rect").data(["bg-rect"]);
          bg_rect.exit().remove();
          bg_rect = bg_rect.enter().insert('rect', ':first-child').attr("class", "bg-rect").style('fill', 'transparent').merge(bg_rect);
          bg_rect.style('fill', 'transparent').attr("x", 0).attr('y', 0).attr('width', _var.width).attr("height", _var.height);

          // Draw Background rect
          var bgRectStroke = _var.g.selectAll("rect.bg-rect-stroke").data(["bg-rect-stroke"]);
          bgRectStroke.exit().remove();
          bgRectStroke = bgRectStroke.enter().insert('rect', ':first-child').attr("class", "bg-rect-stroke").merge(bgRectStroke);
          bgRectStroke.style('fill', 'transparent').attr("x", 0).attr('y', 0).attr('width', _var.width).attr("height", _var.height);

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
