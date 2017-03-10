'use strict';

gViz.vis.bar_chart.draw = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'draw';
  var animation = 900;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {
    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          switch (action) {

            case 'draw':

              // Create bar groups
              var barsGroup = _var.g.selectAll('g.bar-group').data(_var._data);
              barsGroup.exit().remove();
              barsGroup = barsGroup.enter().append('g').attr("class", 'bar-group').merge(barsGroup);
              barsGroup
                .attr("transform", function(d) { return "translate(" + _var.xScale(d.discrete) + ",0)"; })
                .each(function(g) {

                  // Create bar rects
                  var bars = d3.select(this).selectAll('rect.bar').data([g]);
                  bars.exit().remove();
                  bars = bars.enter().append('rect').attr("class", 'bar').merge(bars);
                  bars
                    .attr("x", 0)
                    .attr("width", _var.xScale.bandwidth())
                    .attr("y", function (d) { return _var.yScale(d.continuous); })
                    .attr("height", function (d) { return _var.height - _var.yScale(d.continuous); })
                    .style("fill", function (d) { return _var.colors.scale(d.discrete); });

                  // Create bar labels
                  var text = d3.select(this).selectAll('text.bar').data([g]);
                  text.exit().remove();
                  text = text.enter().append('text').attr("class", 'bar').merge(text);
                  text
                    .attr("x", _var.xScale.bandwidth()/2)
                    .attr("y", function (d) { return _var.yScale(d.continuous) - 5; })
                    .style("font-size", "10px")
                    .style("font-weight", "bold")
                    .style("fill", "#333")
                    .style("text-anchor", "middle")
                    .style("stroke", "none")
                    .text(function(d) { return d.continuous; })

                });

              // Create bg-rect
              var bgRect = _var.g.selectAll('rect.bg-rect').data(["bg-rect"]);
              bgRect.exit().remove();
              bgRect = bgRect.enter().insert('rect', ':first-child').attr("class", 'bg-rect').merge(bgRect);
              bgRect.attr('x', 0).attr('y', 0 ).attr('width', _var.width).attr('height', _var.height )

              // Create bg-rect-stroke
              var bgRectStroke = _var.g.selectAll('rect.bg-rect-stroke').data(["bg-rect"]);
              bgRectStroke.exit().remove();
              bgRectStroke = bgRectStroke.enter().insert('rect', ':first-child').attr("class", 'bg-rect-stroke').merge(bgRectStroke);
              bgRectStroke.attr('x', 0).attr('y', 0 ).attr('width', _var.width).attr('height', _var.height )

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action', 'animation'].forEach(function (key) {

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

  // Execute the specific called function
  main.run = function (_) {
    return main('run');
  };

  return main;
};
