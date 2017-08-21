// Initialize the visualization class
gViz.vis.donut_chart.text = function () {
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

          // Draw center title
          var centerTitle = _var.g.selectAll("text.center-title").data(["center-title"]);
          centerTitle.exit().remove();
          centerTitle = centerTitle.enter().append('text').attr("class", "center-title").merge(centerTitle);
          centerTitle
            .style('fill', node.data.color)
            .attr('x', 0)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .text(gViz.shared.helpers.text.replaceVariables(_var.data.tooltip.title, tooltipObj))
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)

          // Draw center value
          var centerValue = _var.g.selectAll("text.center-value").data(["center-value"]);
          centerValue.exit().remove();
          centerValue = centerValue.enter().append('text').attr("class", "center-value").merge(centerValue);
          centerValue
            .style('fill', node.data.color)
            .attr('x', 0)
            .attr('y', 10)
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
            .attr('y', 45)
            .attr('text-anchor', 'middle')
            .text(node.data[_var.metric] != null ? d3.format('.2')(+node.data[_var.metric] / +_var.data[_var.metric].total * 100) + "%" : "No value")
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)

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
