'use strict';

gViz.vis.correlation_matrix.draw = function () {
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

              var row = function row(_row) {


                // Appends Rectangles to each row
                var cell = d3.select(this).selectAll('.' + _var._class + '.cell')
                  .data(_row.filter(function (d) {
                    return d.z;
                  }))
                  .enter()
                  .append("rect")
                  .attr("class", _var._class + ' cell')
                  .attr("x", function (d, i) { return _var.xScale(d.y); })
                  .attr("y", function (d) { return _var.yScale(d.x); })
                  .attr("width", _var.xScale.bandwidth())
                  .attr("height", _var.yScale.bandwidth())
                  .style("fill-opacity", 0.6)
                  .style("fill", function (d) {
                    var n = _var.matrix[d.x][d.y].z;
                    return _var.colourScale(n);
                  })
                  .on("click", function(d) {
                    console.log(d);
                  });
              };


              // For each row appends the rectangles
              _var.row = _var.g.selectAll('.' + _var._class + '.row')
                .data(_var.matrix)
                .enter()
                .append("g")
                .attr("class", _var._class + ' row')
                .each(row);

              // Appends rows division lines
              _var.row
                .append("line")
                .attr("class", _var._class + ' row line')
                .attr("x2", _var.matrix_width)
                .attr("transform", function (d, i) { return "translate(0," + _var.yScale(i) + ")"; });

              // Rows labels
              _var.row
                .append("text")
                .attr("class", _var._class + ' row text')
                .attr("x", -6)
                .attr("transform", function (d, i) {
                  return 'translate(0, ' + (_var.yScale(i) + _var.yScale.bandwidth() / 2) + ')';
                })
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text(function (d, i) {
                  return _var._data.rows[i].name;
                });

              // Appends columns division lines
              _var.column = _var.g.selectAll('.' + _var._class + '.column')
                .data(_var.matrix[0])
                .enter()
                .append("g")
                .attr("class", _var._class + ' column');

              _var.column
                .append("line")
                .attr("class", _var._class + ' column line')
                .attr("y2", _var.matrix_height)
                .attr("transform", function (d, i) {
                  return "translate(" + _var.xScale(i) + ",0)";
              });

              // Appends columns labels
              _var.column
                .append("text")
                .attr("class", _var._class + ' column text')
                .attr("x", 40)
                .attr("transform", function (d, i) {
                  return 'translate(' + (_var.xScale(i) + _var.xScale.bandwidth() / 2)
                    + ' ,0) rotate(-90)';
                })
                .attr("dy", ".32em")
                .attr("text-anchor", "middle")
                .text(function (d, i) { return _var._data.columns[i].name; });

              if (_var.matrix_width < $(_var.container.el).width()
                  && _var.matrix_height < $(_var.container.el).height()) {

                _var.g.attr("transform", 'translate('
                + ($(_var.container.el).width() / 2 - _var.matrix_width / 2) + ', '
                + ($(_var.container.el).height() / 2 - _var.matrix_height / 2) + ')');
              }

              var legendSize = 20;

              _var.legend
                .append("rect")
                .attr("width", legendSize)
                .attr("height", legendSize)
                .attr("x", _var.matrix_width + 100)
                .attr("y", function(d, i) { return _var.yScale(_var.orders.y[0]) + 25 * i; })
                .style("fill-opacity", 0.6)
                .style("fill", function(d) { return _var.colourScale(d); });

              /*
              _var.legend
                .append("text")
                .attr("x", _var.matrix_width + 130)
                .attr("y", function(d, i) { return 3*legendSize/4
                  + _var.height - _var.matrix_height + 25 * i;
                })
                .style("fill-opacity", 0.6)
                .text(function(d, i) {

                  if(_var.colourRange[i-1]) { var _d = _var.colourRange[i-1]; }

                  if(retr_dec(d.toString()) > 2) { d = d.toFixed(2); }
                  if(_d && retr_dec(_d.toString()) > 2) { _d = _d.toFixed(2); }

                  switch(i) {
                    case 0:
                      return d;
                      break;
                    default:
                      return _d + " < n < " + d;
                  }
                });
                */

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
