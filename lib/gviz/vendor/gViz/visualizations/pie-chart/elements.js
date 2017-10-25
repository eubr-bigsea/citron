// Initialize the visualization class
gViz.vis.pieChart.elements = function () {
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
          var _data = _var.pie(data == null ? _var.data.data : data);

          // Element canvas
          var elements = _var.g.selectAll(".chart-elements").data(["chart-elements"]);
          elements.exit().remove();
          elements = elements.enter().append("g").attr("class", "chart-elements").merge(elements);

          // Create groups
          var groups = elements.selectAll(".element-group").data(_data, function (d) { return d.data.id; });
          groups.exit().remove();
          groups = groups.enter().append("g").attr("class", "element-group").merge(groups);

          // For each element in group
          groups.each(function (e, i) {

            // Draw arcs
            var arc = d3.select(this).selectAll("path.node-arc").data([e], function(d) { return d.data.id; });
            arc.exit().remove();
            arc = arc.enter().append('path').attr("class", "node-arc").merge(arc);
            arc
              .style('fill', function(d) { return d.data._color; })
              .style('stroke', function(d) { return d.data._color; })
              .transition()
                .attr("d", _var.arc)

            // Draw text text
            var text = d3.select(this).selectAll(".node-text").data([e], function(d) { return d.data.id; });
            text.exit().remove();
            text = text.enter().append('text').attr("class", "node-text").merge(text);
            text
              .attr("transform", function(d) { return "translate(" + _var.labelArc.centroid(d) + ")"; })
              .attr("dy", ".3em")
              .attr("font-size", "12px")
              .attr("text-anchor", function(d) { return (d.startAngle + d.endAngle)/2 > Math.PI ? "end" : "start"; })
              .style('fill', function(d) { return d.data._color; })
              .html(function(d) { return _var.format(d.data.x); })

          });

          // Event bindings
          groups.on('mouseover', function(e) {

            // Set hovered node
            _var.hovered = e;

            // Mouseover event
            components.events()
              ._var(_var)
              .action("mouseover")
              .components(components)
              .node(e)
              .run();

          }).on('mouseout', function(e) {

            // Reset hovered node
            _var.hovered = null;

            // Mouseout event
            components.events()
              ._var(_var)
              .action("mouseout")
              .components(components)
              .run();

          })

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
