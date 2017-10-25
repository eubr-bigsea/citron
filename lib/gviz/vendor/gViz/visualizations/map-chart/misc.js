// Initialize the visualization class
gViz.vis.map.misc = function () {
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
          // _var.container.d3.selectAll('.grid-background, .pie-chart').style('top', top + 'px')

          // Has title flag
          // var hasTitle = _var.data.title != null && _var.data.title !== "";

          // Draw title wrapper
          _var.titleWrapper = _var.headerWrapper.selectAll(".title-wrapper").data(["title-wrapper"]);// svg:g
          _var.titleWrapper.exit().remove();
          _var.titleWrapper = _var.titleWrapper.enter().append('div').attr('class', "title-wrapper grid-stack-item-content").merge(_var.titleWrapper);

          var moveIcon = '<i class="fa fa-arrows"'
          moveIcon += 'style="float: right; margin-top: 3px; cursor: pointer;">';
          moveIcon += '</i>';

          // _var.data.title = null;

          _var.titleWrapper
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
            .html(function() {
              if(_var.data.title) { return _var.data.title + moveIcon; }
              else return moveIcon;
            });

          // Has legend flag
          var hasLegend = _var.data.legend != null && _var.data.legend.isVisible != null && _var.data.legend.isVisible === true;
          var legendWrapper, innerWrapper;

          // Draw legend wrapper
          _var.legendWrapper = _var.headerWrapper.selectAll(".legend-wrapper").data(hasLegend ? ["legend-wrapper"] : []); // svg:g
          _var.legendWrapper.exit().remove();
          _var.legendWrapper = _var.legendWrapper.enter().append('div').attr('class', "legend-wrapper").merge(_var.legendWrapper);

          _var.legendWrapper
            .style('width', '100%')
            .style('height', '30px')
            .style('oveflow-y', 'hidden')
            .style('oveflow-x', 'auto')
            .style('padding-left', _var.margin.left + "px")
            .each(function(d) {

              _var.scaleWrapper = d3.select(this).selectAll(".scale-wrapper").data(["scale-wrapper"]); // svg:g
              _var.scaleWrapper.exit().remove();
              _var.scaleWrapper = _var.scaleWrapper.enter().append("div").attr("class", "scale-wrapper").merge(_var.scaleWrapper);

              if(!_var.renderedScale) {
                _var.scaleWrapper
                  .each(function(d) {
                    d3.select(this).append("span").attr("class", "legend-left").text("Low");
	                  d3.select(this).append("svg").attr("class", "scale-rect").attr("width", 20).attr("height", 10);
                    d3.select(this).append("span").attr("class", "legend-right").text("High");
                  });

                // Set margin left and display style
                _var.scaleWrapper.select('.scale-wrapper, .scale-wrapper-full').style('display', 'block');

                // Set margin left and display style
                _var.scaleWrapper.select('.scale-wrapper')
                  .style('display', _var.mode.heat === true ? 'block' : 'none');

                _var.renderedScale = true;

                d3.select('.scale-rect')
                  .style('background', "linear-gradient(to right, "+_var.heatColors.join(',')+")");
              }

            });

          // _var.mapWrapper
          //   .style("height", _var.container.clientRect.height - $(_var.headerWrapper.node()).height() - 1 + "px");

          /*
          var hasToggle = _var.data.legend != null && _var.data.toggle.isVisible != null && _var.data.toggle.isVisible === true;

          // Draw legend wrapper
          var toggleWrapper = legendWrapper.selectAll(".toggle-wrapper").data(hasToggle ? ["toggle-wrapper"] : []); // svg:g
          toggleWrapper.exit().remove();
          toggleWrapper = toggleWrapper.enter().append('div').attr('class', "toggle-wrapper").merge(toggleWrapper);

          toggleWrapper.style("float", "right").style("margin-top", "8px");
          toggleWrapper.append("span").attr("class", "toggle-left").text("heat");

          var toggle = toggleWrapper
            .append("div")
            .attr("class", "toggle-button")
            .append("label")
            .attr("class", "toggle-switch");

          toggle
            .append("input")
            .attr("id", "toggle")
            .attr("type", "checkbox");

          toggle
            .append("span")
            .attr("class", "toggle-slider round");

          toggle
            .on("click", function() {
              // Prevents event from being triggered twice
              d3.event.preventDefault();

              // Gets current toggle state
              var state = d3.select("#toggle").attr("checked");

              // Untoggles if toggle is on and vice-versa
              d3.select("#toggle").attr("checked", function() {
                if(state === "true") { $(this).removeAttr("checked"); }
                else { return true; }
              });
            });

          toggleWrapper.append("span").attr("class", "toggle-right").text("bars");
          */


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
