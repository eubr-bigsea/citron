gViz.vis.lineChart.elements = function () {
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
          var groups = elements.selectAll(".element-group").data(data, function (d) { return d.id; });
          groups.exit().remove();
          groups = groups.enter().append("g").attr("class", "element-group").merge(groups);

          // For each element in group
          groups
            .each(function (e, i) {

              // Draw Background rect
              var line = d3.select(this).selectAll(".line").data([e]);
              line.exit().remove();
              line = line.enter().append('path').attr("class", "line").merge(line);
              line
                .style('stroke', function(d) { return d.color; })
                .attr('d', function(d) { return _var.lineConstructor(d.values); })

            });

          //  // Event bindings
          //  groups.on('mouseover', function(e) {

          //    // Set hovered node
          //    _var.hovered = e;

          //    // Mouseover event
          //    components.events()
          //      ._var(_var)
          //      .action("mouseover")
          //      .components(components)
          //      .node(e)
          //      .run();

          //  }).on('mouseout', function(e) {

          //    // Reset hovered node
          //    _var.hovered = null;

          //    // Mouseout event
          //    components.events()
          //      ._var(_var)
          //      .action("mouseout")
          //      .components(components)
          //      .run();

          //  }).on('click', function(e) {

          //    if(_var.clicked == null || _var.clicked.id !== e.id) {

          //      // Set clicked node
          //      _var.clicked = e;

          //      // Insert track components
          //      components.track()
          //        ._var(_var)
          //        .components(components)
          //        .node(e)
          //        .run();

          //    } else if(e.id === _var.clicked.id) {

          //      // Set clicked node
          //      _var.clicked = null;

          //      // Remove track circles
          //      _var.g.selectAll(".chart-track-elements").selectAll(".track-circle, .track-path").remove();

          //    }

          //  });

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
