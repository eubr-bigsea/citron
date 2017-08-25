// Initialize the visualization class
gViz.vis.verticalBarChart.misc = function () {
  "use strict";

  // Get attributes values
  var _var      = undefined;
  var animation = 900;
  var components = {};

  // Validate attributes
  var validate = function(step) {
    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Update height based on title
          var top = 0;
          if(_var.data.title != null && _var.data.title !== "") { top += 35; }
          if(_var.data.legend != null && _var.data.legend.isVisible != null && _var.data.legend.isVisible === true) { top += 30; }

          // Update container
          _var.container.d3.selectAll('.grid-background, .bar-chart').style('top', top + 'px')

          // Has title flag
          var hasTitle = _var.data.title != null && _var.data.title !== "";

          // Draw title wrapper
          var titleWrapper = _var.container.d3.selectAll(".title-wrapper").data(hasTitle ? ["title-wrapper"] : []); // svg:g
          titleWrapper.exit().remove();
          titleWrapper = titleWrapper.enter().append('div').attr('class', "title-wrapper").merge(titleWrapper);
          titleWrapper
            .style('width', '100%')
            .style('height', '30px')
            .style('margin', '0px 0px 5px 0px')
            .style('padding', '6px 10px 5px')
            .style('oveflow', 'hidden')
            .style('white-space', 'nowrap')
            .style('text-overflow', 'ellipsis')
            .style('background-color', '#eee')
            .style('color', '#666')
            .style('font-size', '12px')
            .html(_var.data.title)

          // Has legend flag
          var hasLegend = _var.data.legend != null && _var.data.legend.isVisible != null && _var.data.legend.isVisible === true;
          var legendWrapper, innerWrapper;

          // Draw legend wrapper
          legendWrapper = _var.container.d3.selectAll(".legend-wrapper").data(hasLegend ? ["legend-wrapper"] : []); // svg:g
          legendWrapper.exit().remove();
          legendWrapper = legendWrapper.enter().append('div').attr('class', "legend-wrapper").merge(legendWrapper);
          legendWrapper
            .style('width', '100%')
            .style('height', '30px')
            .style('oveflow-y', 'hidden')
            .style('oveflow-x', 'auto')
            .style('padding-left', _var.margin.left + "px")
            .each(function(d) {

              // Draw legend wrapper
              innerWrapper = d3.select(this).selectAll(".legend-inner").data(hasLegend ? ["legend-inner"] : []); // svg:g
              innerWrapper.exit().remove();
              innerWrapper = innerWrapper.enter().append('div').attr('class', "legend-inner").merge(innerWrapper);
              innerWrapper
                .style('width', 'auto')
                .style('height', '100%')
                .style('white-space', 'nowrap')

            });

          if(innerWrapper != null) {

            // Initialize string
            var string = "";
            var stringObj = {};

            // Iterate over xIn domain
            var legendDomain = Object.keys(_var.legendDomain).map(function(k) { return _var.legendDomain[k]; })
            var legendDomainNeg = Object.keys(_var.legendDomainNeg).map(function(k) { return _var.legendDomainNeg[k]; })

            legendDomain.concat(legendDomainNeg).forEach(function(d) {

              // Get color
              var fillColor = _var.data.colors[d.x] == null || _var.data.colors[d.x].fill == null ? "#666" : _var.getColor(d);
              var strokeColor = _var.data.colors[d.x] == null || _var.data.colors[d.x].stroke == null ? "#333" : _var.getColor(d, 'stroke');
              var legend = _var.data.legend != null && _var.data.legend.text != null ? _var.data.legend.text : "{{name}}";
              var legendStr = "";

              // Add rect for obj
              legendStr += "<span class='rect' style='background-color:"+fillColor+" ; border-top: 2px solid "+strokeColor+";'></span><span class='name'>";
              legendStr += gViz.shared.helpers.text.replaceVariables(legend, d);
              legendStr += "</span>";

              // If the legend str wasnt computed, add to legend
              if(stringObj[legendStr] == null) {
                stringObj[legendStr] = true;
                string += legendStr;
              }

            });

            // Update legend
            innerWrapper.html(string);

          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','animation','components'].forEach(function(key) {

    // Attach variables to validation function
    validate[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return validate;
    };

    // Attach variables to main function
    return main[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = _ => main('run');

  return main;
};
