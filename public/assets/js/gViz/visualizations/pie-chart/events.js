// Initialize the visualization class
gViz.vis.pieChart.events = function () {
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

          // Select groups
          var groups = _var.g.selectAll(".chart-elements").selectAll(".element-group");
          var arcs   = _var.g.selectAll(".chart-elements").selectAll(".element-group").selectAll(".node-arc");
          var labels   = _var.g.selectAll(".chart-elements").selectAll(".element-group").selectAll(".node-text");

          switch (action) {

            case 'mouseover':

              // Update arc size
              var bigArc = d3.arc()
                .outerRadius(_var.size + 5)
                .innerRadius(0);

              // Fade arcs and add drop shadow
              arcs.transition()
                .attr("d", function(g) { return g.data.id === node.data.id ? bigArc(g) : _var.arc(g); })
                .style('fill', function(g) { return g.data.id === node.data.id ? g.data.color : g.data._color; })
                .style('stroke', function(g) { return g.data.id === node.data.id ? g.data.color : "#FFF"; })
                .style('opacity', function(g) { return g.data.id === node.data.id  ? 1 : 0.3; })
                .style("filter", function(g) { return g.data.id === node.data.id ? "url(#"+_var.shadowId+")" : ""; })

              // Update label arc size
              var bigLabelArc = d3.arc()
                .outerRadius(_var.size + 20)
                .innerRadius(_var.size + 10);

              // Update label arc size
              labels
                .html(function(d) {
                  var y = (d.startAngle + d.endAngle)/2 < Math.PI/2 || (d.startAngle + d.endAngle)/2 > (Math.PI/2)*3 ? -12 : 0;
                  var text = d.data.id === node.data.id ? "<tspan x='0' y='" + (y) + "' style='font-weight: bold;'>" + d.data.name + "</tspan>" : "";
                  text += d.data.id === node.data.id ? "<tspan x='0' y='" + (y + 17) + "'>" + _var.format(d.data.x) + "</tspan>" : _var.format(d.data.x);
                  return text;
                })
                .transition()
                  .style('opacity', function(g) { return g.data.id === node.data.id  ? 1 : 0.3; })
                  .attr("transform", function(d) { return "translate(" + (d.data.id === node.data.id ? bigLabelArc.centroid(d) : _var.labelArc.centroid(d)) + ")"; })

              // Initialize tooltip object
              var tooltipObj = {};

              // Set node attributes to tooltip obj
              Object.keys(node.data).forEach(function(k) { tooltipObj[k] = node.data[k]; });

              break;

            case 'mouseout':

              // Reset arcs
              arcs.transition()
                .style('fill', function(g) { return g.data._color; })
                .style('stroke', function(g) { return g.data._color; })
                .style('opacity', 1)
                .style('filter', '')
                .attr("d", _var.arc)

              // Reset labels
              labels
                .html(function(d) { return _var.format(d.data.x); })
                .transition()
                  .style('opacity', 1)
                  .attr("transform", function(d) { return "translate(" + _var.labelArc.centroid(d) + ")"; })

              // Set node
              node = _var.data[_var.metric];

              break;

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
