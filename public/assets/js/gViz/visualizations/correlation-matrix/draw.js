gViz.vis.correlation_matrix.draw = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  var action    = 'draw';
  var animation = 900;

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

          switch (action) {

            case 'draw':

              let row = function(row) {

                // Appends Rectangles to each row
								var cell = d3.select(this).selectAll(`.${_var._class}.cell`)
									.data(row.filter(function(d) { return d.z; }))
									.enter().append("rect")
									.attr("class", `${_var._class} cell`)
									.attr("x", function(d) { return _var.xScale(d.y); })
									.attr("y", function(d) { return _var.yScale(d.x); })
									.attr("width",  _var.xScale.bandwidth())
									.attr("height", _var.yScale.bandwidth())
									.style("fill-opacity", function(d) { return _var.zScale(d.z); })
									.style("fill", function(d) { 
                    return _var._data.rows[d.x].group == _var._data.columns[d.y].group ? 
                      _var.colors.scale(_var._data.rows[d.x].group) : "none"; });

              }

              // Appends matrix placeholder
              _var.g.append("rect")
               	.attr("class", `${_var._class} background`)
                .attr("width", _var.width)
                .attr("height", _var.height);

              // For each row appends the rectangles
              _var.row = _var.g.selectAll(`.${_var._class}.row`)
                .data(_var.matrix)
                .enter().append("g")
                .attr("class", `${_var._class} row`)
                .each(row);

              // Appends rows division lines
              _var.row.append("line")
                .attr("x2", _var.width)
                .attr("transform", function(d, i) { 
                  return "translate(0," + _var.yScale(i) + ")"; })
              
              // Rows labels
              _var.row.append("text")
                .attr("x", -6)
                .attr("y", function(d, i) { return _var.yScale(i) + (_var.yScale.bandwidth() / 2) })
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text(function(d, i) { return _var._data.rows[i].name; });

              // Appends columns division lines
              _var.column = _var.g.selectAll(`.${_var._class}.column`)
                .data(_var.matrix[0])
                .enter().append("g")
                .attr("class", `${_var._class} column`);

              _var.column.append("line")
                .attr("y1", _var.height)
                .attr("transform", function(d, i) { 
                  return "translate(" + _var.xScale(i) + ")"; });

              // Appends columns labels
              _var.column.append("text")
                .attr("x", function(d, i) { return _var.xScale(i) + 8; })
                .attr("y", -15)
                .attr("dy", ".32em")
                .attr("text-anchor", "start")
                .text(function(d, i) { return _var._data.columns[i].name; });

            break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','action','animation'].forEach(function(key) {

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

  // Execute the specific called function
  main.run = _ => main('run');

  return main;
}
