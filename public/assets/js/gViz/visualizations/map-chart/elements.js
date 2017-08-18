// Initialize the visualization class
gViz.vis.map.elements = function () {
  "use strict";

  // Get attributes values
  var _var       = null;
  var components = {};
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

          var update = function()  {
            barsGroup.attr("transform", function(d) {
              return "translate("
                + _var.map.latLngToLayerPoint(d).x + ","
                + _var.map.latLngToLayerPoint(d).y + ")";
            })
            .style("display", "block");
          };

          var hideBars = function() {
            barsGroup.style("display", "none");
          };

          // Set data array
          var _data = (data == null ? _var.data.data : data);

          // Element canvas
          var elements = _var.g.selectAll(".chart-elements").data(["chart-elements"]);
          elements.exit().remove();
          elements = elements.enter().append("g").attr("class", "chart-elements").merge(elements);

          // Create groups
          var barsData = _var.mode.bars === true && _var.data.data != null ? _var.data.data : [];
          var barsGroup = elements.selectAll(".bars-group").data(barsData);
          barsGroup.exit().remove();
          barsGroup = barsGroup.enter().append("g").attr("class", "bars-group").merge(barsGroup);

          // For each element in group
          barsGroup
            .attr('transform', function(d) { return "translate("+_var.map.latLngToLayerPoint(d).x+","+_var.map.latLngToLayerPoint(d).y+")"; })
            .each(function (e, i) {

              // Draw bottom bars
              _var.bottomBars = d3.select(this).selectAll(".bottom-bar").data([e]);
              _var.bottomBars.exit().remove();
              _var.bottomBars = _var.bottomBars.enter().append("rect").attr("class", "bottom-bar").merge(_var.bottomBars);
              _var.bottomBars.transition()
                .attr('x', function(d) { return -_var.barWidth(d)/2; })
                .attr('y', _var.bottomBarY)
                .attr('width', _var.barWidth)
                .attr('height', _var.bottomBarHeight)
                .attr('fill', _var.bottomBarColor)

              // Draw bars
              _var.bars = d3.select(this).selectAll(".bar").data([e]);
              _var.bars.exit().remove();
              _var.bars = _var.bars.enter().append("rect").attr("class", "bar").merge(_var.bars);

              _var.bars.transition()
                .attr('x', function(d) { return -_var.barWidth(d)/2; })
                .attr('y', _var.barY)
                .attr('width', _var.barWidth)
                .attr('height', _var.barHeight)
                .attr('fill', _var.barColor)

            });

          // Hover action
          barsGroup.on('mouseover', function(e) {

              // Set hovered node
              _var.hovered  = e.id;

              // Mouseover event
              components.events()
                ._var(_var)
                .action("mouseover")
                .components(components)
                .node(e)
                .run();

            // Mouseout action
            }).on('mouseout', function(e) {

              // Reset hovered node
              _var.hovered  = null;

              // Mouseout event
              components.events()
                ._var(_var)
                .action("mouseout")
                .components(components)
                .node(e)
                .run();

            });

            barsGroup.style("cursor", "pointer");

            _var.map.on("move", update);
            _var.map.on("resize", update);
            _var.map.on("moveend", update);
            _var.map.on("zoomstart", hideBars);
            _var.map.on("zoomend", update);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'components','data'].forEach(function (key) {

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
