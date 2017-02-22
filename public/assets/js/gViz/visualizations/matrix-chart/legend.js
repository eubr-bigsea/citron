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
  var legend_domain  = undefined;

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

              var colour_range = _var.colors.scale.range();

              var domain = legend_domain || d3.extent(_var._data.links, function(d) {
                return parseFloat(d["value"].toFixed(2));
              });

              // Gets range of scale domain
              var range = domain[1] - domain[0];

              // One_Range is true if min value = max value
              var one_range = false;

              var range_text = [];
              range_text.push(domain[0]);

              var diff = range/(ticks - 1);

              switch(units.toLowerCase()) {

                case "discrete":

                  if(range > 1) {
                    diff = Math.ceil(diff);

                    // Adds values to be printed
                    for(var i = 1; i < ticks - 1; i++) {
                      range_text.push(range_text[i - 1] + diff);
                    }

                    range_text.push(domain[1]);
                    break;
                  }

                  // On a continuous case, min value will seldom be equals to
                  // max value. Therefore, one range is only updated here.
                  if(range != 1)
                    one_range = true;

                  range_text.push(domain[1]);
                  break;

                case "continuous":

                  // Adds values to be printed
                  for(var i = 1; i < ticks - 1; i++) {
                    var next = range_text[i - 1] + diff;
                    range_text.push(parseFloat(next.toFixed(2)));
                  }

                  range_text.push(domain[1]);
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

              var colour_offset = 0;
              var colour_interval = (1/(colour_range.length - 1)) * 100;
              var colour_data = [];

              colour_range.forEach(function(colour, i) {
                var stop = {
                  offset:   String(colour_offset) + "%",
                  colour:   colour
                }

                colour_data.push(stop);
                colour_offset += colour_interval;
              })

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
                .style("fill", function() {
                  return one_range ? colour_range[0] : "url(#linear-gradient)";
                });

              _var.legend_text
                .attr("text-anchor", "middle")
                .attr("x", function(d, i) {
                  if(one_range || range == 1 && units == "discrete")
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
  ['_var', 'action', 'animation', 'width', 'height', 'units', 'ticks',
    'title', 'legend_domain'].forEach(function (key) {

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
