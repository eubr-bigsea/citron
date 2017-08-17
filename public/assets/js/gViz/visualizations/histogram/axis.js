gViz.vis.histogram.axis = function () {
  "use strict";

  // Get attributes values
  var _var = undefined;
  var action = 'create';

  // Validate attributes
  var validate = function validate(step) {
    switch (step) {
      case 'run': return true;
      default: return false;
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

            case 'create':

              // Create and update X axis
              _var.x_axis = _var.g.selectAll(".x.axis").data(['x']);
              _var.x_axis.exit().remove();
              _var.x_axis = _var.x_axis.enter().append('g').attr("class", "x axis").merge(_var.x_axis);
              _var.x_axis.call(_var.xAxis.tickSize(-1)).attr("transform", 'translate(0,' + _var.height + ')')
              _var.x_axis.selectAll(".tick line").attr('y1', 3)
              _var.x_axis.selectAll(".tick text")
                .attr('x', function(d, i) {
                  if(i === _var.x_axis.selectAll(".tick text").size()-1) { return -(this.getBBox().width/2) + _var.margin.right; }
                  else { return 0; }
                })

              // Remove overlapping tick text
              _var.x_axis.selectAll(".tick text").filter(function(d) { return d === _var.xTarget; }).remove();

              //// Create and update Y axis
              //_var.y_axis = _var.g.selectAll(".y.axis").data(['y']);
              //_var.y_axis.exit().remove();
              //_var.y_axis = _var.y_axis.enter().append('g').attr("class", "y axis").merge(_var.y_axis);
              //_var.y_axis.call(_var.yAxis.tickSize(-_var.width))
              //_var.y_axis.selectAll(".tick line").attr('x1', -3)

              //// Remove overlapping tick text
              //_var.y_axis.selectAll(".tick text").filter(function(d) { return d === _var.yTarget; }).remove();

              // Create and update Axis legend
              _var.axis_legend = _var.g.selectAll(".axis-legend").data(['axis-legend']);
              _var.axis_legend.exit().remove();
              _var.axis_legend = _var.axis_legend.enter().append('text').attr("class", "axis-legend").merge(_var.axis_legend);
              _var.axis_legend
                .attr('text-anchor', 'start')
                .attr('y', -15)
                .text(function() {
                  var t =  "Axis labels ( ";
                      t += "X-"+(_var.data.x != null && _var.data.x.title != null && _var.data.x.title !== "" ? _var.data.x.title : "No legend.");
                      t += " )"
                  return t;
                });

              break;

          }
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action'].forEach(function (key) {

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

