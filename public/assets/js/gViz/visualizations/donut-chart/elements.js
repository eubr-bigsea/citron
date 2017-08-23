// Initialize the visualization class
gViz.vis.donutChart.elements = function () {
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

            // Draw Background rect
            var arc = d3.select(this).selectAll("path.node-arc").data([e]);
            arc.exit().remove();
            arc = arc.enter().append('path').attr("class", "node-arc").merge(arc);
            arc
              .style('fill', function(d) { return d.data._color; })
              .style('stroke', function(d) { return d.data._color; })
              .transition()
                .attr("d", _var.arc)

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

          // Set node
          var node = _var.data[_var.metric];

          // Draw center title
          var centerTitle = _var.g.selectAll("text.center-title").data(["center-title"]);
          centerTitle.exit().remove();
          centerTitle = centerTitle.enter().append('text').attr("class", "center-title").merge(centerTitle);
          centerTitle
            .style('fill', _var.data != null && node != null && node.color != null ? node.color : "#666" )
            .attr('x', 0)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .text(_var.data != null && node != null && node.title != null ? node.title : "No Title")
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)

          // Remove center image
          _var.g.selectAll(".center-image").transition().style('opacity', 0).remove();

          // Draw center value
          var centerValue = _var.g.selectAll("text.center-value").data(["center-value"]);
          centerValue.exit().remove();
          centerValue = centerValue.enter().append('text').attr("class", "center-value").merge(centerValue);
          centerValue
            .style('fill', _var.data != null && node != null && node.color != null ? node.color : "#666" )
            .attr('x', 0)
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .text(_var.data != null && node != null ? node._value : "No value")
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)

          // Draw center percentage
          var centerPercentage = _var.g.selectAll("text.center-percentage").data([]);
          centerPercentage.exit().remove();
          centerPercentage = centerPercentage.enter().append('text').attr("class", "center-percentage").merge(centerPercentage);
          centerPercentage
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)

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
