// Initialize the visualization class
gViz.vis.donutChart.events = function () {
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

          switch (action) {

            case 'mouseover':

              // Update arc size
              //
              var bigArc = d3.arc()
                .outerRadius(_var.size + 5)
                .innerRadius(_var.size - _var.radius - 5);

              // Fade arcs and add drop shadow
              arcs.transition()
                .attr("d", function(g) { return g.data.id === node.data.id ? bigArc(g) : _var.arc(g); })
                .style('fill', function(g) { return g.data.id === node.data.id ? g.data.color : g.data._color; })
                .style('stroke', function(g) { return g.data.id === node.data.id ? g.data.color : "#FFF"; })
                .style('opacity', function(g) { return g.data.id === node.data.id  ? 1 : 0.3; })
                .style("filter", function(g) { return g.data.id === node.data.id ? "url(#"+_var.shadowId+")" : ""; })

              // Initialize tooltip object
              var tooltipObj = {};

              // Set node attributes to tooltip obj
              Object.keys(node.data).forEach(function(k) { tooltipObj[k] = node.data[k]; });

              // Draw center title
              var centerTitle = _var.g.selectAll("text.center-title").data(["center-title"]);
              centerTitle.exit().remove();
              centerTitle = centerTitle.enter().append('text').attr("class", "center-title").merge(centerTitle);
              centerTitle
                .style('fill', node.data.color)
                .attr('x', 0)
                .attr('y', node.data.img == null || node.data.img === '' ? -20 : -45)
                .attr('text-anchor', 'middle')
                .text(gViz.shared.helpers.text.replaceVariables(_var.data.tooltip.title, tooltipObj))
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)

              // Draw center image
              var centerImage = _var.g.selectAll(".center-image").data(node.data.img == null || node.data.img === '' ? [] : ["center-value"]);
              centerImage.exit().remove();
              centerImage = centerImage.enter().append('image').attr("class", "center-image").merge(centerImage);
              centerImage
                .attr("xlink:href", node.data.img)
                .attr("width", 65)
                .attr("height", 65)
                .attr('x', -30)
                .attr('y', -35)
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1);

              // Draw center value
              var centerValue = _var.g.selectAll("text.center-value").data(["center-value"]);
              centerValue.exit().remove();
              centerValue = centerValue.enter().append('text').attr("class", "center-value").merge(centerValue);
              centerValue
                .style('fill', node.data.color)
                .attr('x', 0)
                .attr('y', node.data.img == null || node.data.img === '' ? 20 : 60)
                .attr('text-anchor', 'middle')
                .text(node.data[_var.metric] != null ? _var.format(+node.data[_var.metric]) : "No value")
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)

              // Draw center percentage
              var centerPercentage = _var.g.selectAll("text.center-percentage").data(_var.data.tooltip.hasPercentage === true ? [node] : []);
              centerPercentage.exit().remove();
              centerPercentage = centerPercentage.enter().append('text').attr("class", "center-percentage").merge(centerPercentage);
              centerPercentage
                .attr('x', 0)
                .attr('y', node.data.img == null || node.data.img === '' ? 55 : 95)
                .attr('text-anchor', 'middle')
                .text(node.data[_var.metric] != null ? d3.format('.2')(+node.data[_var.metric] / +_var.data[_var.metric].total * 100) + "%" : "No value")
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)

              break;

            case 'mouseout':

              // Reset arcs and links opacity
              arcs.transition()
                .style('fill', function(g) { return g.data._color; })
                .style('stroke', function(g) { return g.data._color; })
                .style('opacity', 1)
                .style('filter', '')
                .attr("d", _var.arc)

              // Set node
              node = _var.data[_var.metric];

              // Draw center title
              var centerTitle = _var.g.selectAll("text.center-title").data(["center-title"]);
              centerTitle.exit().remove();
              centerTitle = centerTitle.enter().append('text').attr("class", "center-title").merge(centerTitle);
              centerTitle
                .style('fill', _var.data != null && node != null && node.color != null ? node.color : "#666" )
                .attr('y', 0)
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
                .attr('y', 0)
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
