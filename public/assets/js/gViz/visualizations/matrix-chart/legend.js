'use strict';

gViz.vis.matrix_chart.legend = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'draw';
  var animation = 900;

  var width   = undefined;
  var height  = undefined;
  var units   = undefined;
  var ticks   = undefined;
  var title   = undefined;

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

              // Colour Range of the Gradient, from smallest to biggest value
					    var min_colour = _var.colors.scale.range()[0];
					    var max_colour = _var.colors.scale.range()[1];

              // Min e Max val of the scale domain
              var min_val = parseFloat(_var.colors.scale.domain()[0].toFixed(2));
              var max_val = parseFloat(_var.colors.scale.domain()[1].toFixed(2));

              // Gets range of scale domain
              var range = max_val - min_val;

              // One_Range is true if min value = max value
              var one_range = false;

              var range_text = [];
              range_text.push(min_val);

              var diff = range/ticks;

              switch(units.toLowerCase()) {

                case "discrete":

                  if(range > 1) {
                    diff = Math.ceil(diff);

                    // Adds values to be printed
                    for(var i = 1; i < ticks - 1; i++) {
                      range_text.push(range_text[i - 1] + diff);
                    }

                    range_text.push(max_val);
                    break;
                  }

                  // On a continuous case, min value will seldom be equals to
                  // max value. Therefore, one range is only updated here.
                  if(range != 1)
                    one_range = true;

                  range_text.push(max_val);
                  break;

                case "continuous":

                  // Adds values to be printed
                  for(var i = 1; i < ticks - 1; i++) {
                    var next = range_text[i - 1] + diff;
                    range_text.push(parseFloat(next.toFixed(2)));
                  }

                  range_text.push(max_val);
                  break;

                default:
                  console.log("Legend units must be continuous or discrete");

              }

              // Svg filters definition
              _var.defs = _var.g.selectAll(".legend.defs").data(["defs"]);
              _var.defs.exit().remove();
              _var.defs = _var.defs.enter().append("defs").attr("class", "legend defs").merge(_var.defs);

              // Appends linear gradient
              _var.linearGradient = _var.defs.selectAll(".legend.gradient").data(["gradient"]);
              _var.linearGradient.exit().remove();
              _var.linearGradient = _var.linearGradient.enter().append("linearGradient").attr("class", "legend gradient").attr("id", "linear-gradient").merge(_var.linearGradient);

              // Colours of the gradient. If scale has only one range, the
              // colour does not vary
              var colour_data = [
                {
                  offset: "0%",
                  colour: min_colour
                },
                {
                  offset:  "100%",
                  colour: one_range ? min_colour : max_colour
                }
              ]

              // Appends the stop tag on the linear gradient. Updates
              // only if necessary
              _var.legend_colour_range = _var.linearGradient.selectAll(".legend.stop-colour").data(colour_data);
              _var.legend_colour_range.exit().remove();
              _var.legend_colour_range = _var.legend_colour_range.enter().append("stop").attr("class", "legend stop-colour").merge(_var.legend_colour_range);

              _var.legend_colour_range
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "0%");

							//Set the color for the start (0%)
							_var.legend_colour_range
								.attr("offset", function(d) { return d["offset"]; })
								.attr("stop-color", function(d, i) {
                  return d["colour"];
                });


              // Returns number of decimal places
              var retr_dec = function(num) {
                return (num.split('.')[1] || []).length;
              };

              var legendSize = 20;

              // Creates or Updates Legend
              _var.legend = _var.g.selectAll("." + _var._class + ".legend").data(["legend"]);
              _var.legend.exit().remove();
              _var.legend = _var.legend.enter().insert("g").attr("class", _var._class + " legend").merge(_var.legend);
              _var.legend.attr("transform", "translate(" + (_var.matrix_width + 50) + ",0)");

              // Appends the rectangle with the gradient
              _var.legend_rect = _var.legend.selectAll("." + _var._class + ".legend.rect").data(["legend"]);
              _var.legend_rect.exit().remove();
              _var.legend_rect = _var.legend_rect.enter().append("rect").attr("class", _var._class + " legend rect").merge(_var.legend_rect);

              // Appends title
              _var.legend_title = _var.legend.selectAll("." + _var._class + ".legend.title").data(["legend"]);
              _var.legend_title.exit().remove();
              _var.legend_title = _var.legend_title.enter().append("text").attr("class", _var._class + " legend title").merge(_var.legend_title);

              // Appends legend text
              _var.legend_text = _var.legend.selectAll("." + _var._class + ".legend.text").data(range_text);
              _var.legend_text.exit().remove();
              _var.legend_text = _var.legend_text.enter().append("text").attr("class", _var._class + " legend text").merge(_var.legend_text);

              _var.legend_title
                .attr("x", width/2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .text(title);

              _var.legend_rect
                .attr("width", width)
                .attr("height", height)
                .style("fill-opacity", 0.6)
                .style("fill", "url(#linear-gradient)");

              _var.legend_text
                .attr("text-anchor", "middle")
                .attr("x", function(d, i) {
                  if(one_range || range == 1)
                    return i * width;
                  else
                    return i * width/(ticks - 1);
                })
                .attr("y", height + 25)
                .style("fill-opacity", 0.6)
                .text(function(d, i) { return d; });

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action', 'animation', 'width', 'height', 'units', 'ticks', 'title'].forEach(function (key) {

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
