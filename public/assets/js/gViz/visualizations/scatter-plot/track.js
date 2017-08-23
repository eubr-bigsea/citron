// Initialize the visualization class
gViz.vis.scatterPlot.track = function () {
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

          // Element canvas
          var trackElements = _var.gE.selectAll(".chart-track-elements").data(["chart-track-elements"]);
          trackElements.exit().remove();
          trackElements = trackElements.enter().insert("g", '.chart-elements').attr("class", "chart-track-elements").merge(trackElements);

          // Select values
          var values = node.values.filter(function(d) { return +d._tValue >= _var.tAxis.bounds[0] && +d._tValue <= _var.tAxis.bounds[1]; });

          // Draw track circle
          var trackCircle = trackElements.selectAll("circle.track-circle").data(values.sort(function(a,b) { return d3.descending(+a.z, +b.z); }));
          trackCircle.exit().remove();
          trackCircle = trackCircle.enter().append('circle').attr("class", "track-circle").merge(trackCircle);
          trackCircle
            .style('fill', 'transparent')
            .style('stroke', node.color)
            .style('stroke-opacity', 0.7)
            .style('stroke-dasharray', '1 1')
            .attr("transform", function(d) { return `translate(${_var.x(+d.x)},${_var.y(+d.y)})`; })
            .attr('r', function(d) { return _var.z(+d.z); })
            .attr('opacity', _var.clicked == null ? 0 : 1)
            .transition().delay(200).duration(800)
              .style('opacity', 1)

          // Event bindings
          trackCircle.on('mouseover', function(e) {

            // Replicate node obj
            var obj = {};
            Object.keys(node).forEach(function(k) { obj[k] = node[k]; });

            // Parse _values
            obj._values = { x: +e.x, y: +e.y, z: +e.z };

            // Mouseover event
            components.events()
              ._var(_var)
              .action("mouseover")
              .components(components)
              .node(obj)
              .run();

            // Color node
            d3.select(this).style('fill', node.color);

          }).on('mouseout', function(e) {

            // Transparent node
            d3.select(this).style('fill', 'transparent');

            // Mouseover event
            components.events()
              ._var(_var)
              .action("mouseout")
              .components(components)
              .node(_var.clicked)
              .run();

          });

          // Draw track path
          var trackPath = trackElements.selectAll(".track-path").data([node]);
          trackPath.exit().remove();
          trackPath = trackPath.enter().insert('path', ':first-child').attr("class", "track-path").merge(trackPath);
          trackPath
            .style('fill', 'none')
            .style('stroke', node.color)
            .style('stroke-opacity', 0.7)
            .style('stroke-dasharray', '1 1')
            .attr("d", function(d) {

              var path = 'M ' + values
                .sort(function(a,b) { return d3.ascending(+a._tValue, +b._tValue); })
                .map(function(d) { return `${_var.x(+d.x)} ${_var.y(+d.y)}`; })
                .join(' ');

              return path;

            }).style('opacity', _var.clicked == null ? 0 : 1)
            .transition().delay(200).duration(800)
              .style('opacity', 1)

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
