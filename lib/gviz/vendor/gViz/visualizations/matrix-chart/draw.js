'use strict';

gViz.vis.matrix_chart.draw = function () {
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
                    return _var.colors.scale(n);
                  });
                  /*.on("click", function(d) {
                    var n = _var.matrix[d.x][d.y].z;
                    var c = _var.colors.scale(1);
                    console.log(d);
                    console.log(c);
                  });*/
            };

              // Creates or Updates background
              var bg_rect = _var.g.selectAll('.' + _var._class + '.background').data(["bg-rect"], function (d) {
                return d;
              });
              bg_rect.exit().remove();
              bg_rect = bg_rect.enter().insert("rect", ":first-child").attr("class", _var._class + ' background').merge(bg_rect);
              bg_rect.attr("x", 0).attr("y", 0).attr("width", _var.matrix_width).attr("height", _var.matrix_height);

              // Creates or Update Rows
              _var.row = _var.g.selectAll('.' + _var._class + '.row').data(["matrix-rows"], function (d) { return d; });
              _var.row.exit().remove();
              _var.row = _var.g.enter().append('g').attr("class", _var._class + ' row').merge(_var.row);

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


              // Text Overflow Function
              var wrap = function () {
                var self = d3.select(this),
                  textLength = self.node().getComputedTextLength(),
                  text = self.text();
                while (textLength > (_var.margin.left - 15) && text.length > 0) {
                  text = text.slice(0, -1);
                  self.text(text + '...');
                  textLength = self.node().getComputedTextLength();
                }
              }

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
                .style("cursor", "pointer")
                .text(function (d, i) {
                  return _var._data.rows[i].name;
                })
                .each(wrap)
                .append("svg:title")
                .text(function(d, i) { return _var._data.rows[i].name; });

              // Creates or Update Columns
              _var.column = _var.g.selectAll('.' + _var._class + '.column').data(["matrix-columns"], function (d) {
                return d;
              });
              _var.column.exit().remove();
              _var.column = _var.g.enter().append('g').attr("class", _var._class + ' column').merge(_var.column);

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
                .style("cursor", "pointer")
                .text(function (d, i) { return _var._data.columns[i].name; })
                .append("svg:title")
                .text(function(d, i) { return _var._data.columns[i].name; });

              // If matrix is smaller than the screen, centers it
              var center_horizontally = _var.matrix_width < $(_var.container.el).width();
              var center_vertically   = _var.matrix_height < $(_var.container.el).height();

              if (center_vertically && center_horizontally) {
                _var.g.attr("transform", 'translate('
                + ($(_var.container.el).width() / 2 - _var.matrix_width / 2 + _var.margin.left/2) + ', '
                + ($(_var.container.el).height() / 2 - _var.matrix_height / 2 + _var.margin.top/2) + ')');
              }
              else if (center_horizontally) {
                _var.g.attr("transform", 'translate('
                + ($(_var.container.el).width() / 2 - _var.matrix_width / 2 + _var.margin.left/2) + ","
                + _var.margin.top + ")");
              }
              else if (center_vertically) {
                _var.g.attr("transform", 'translate('
                + _var.margin.left + ","
                + ($(_var.container.el).height() / 2 - _var.matrix_height / 2 + _var.margin.top/2) + ')');
              }
              else {
                _var.g.attr("transform", 'translate(' + _var.margin.left + "," + _var.margin.top + ')');
              }

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
