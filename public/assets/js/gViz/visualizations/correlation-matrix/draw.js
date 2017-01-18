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

								var cell = d3.select(this).selectAll(`.${_var._class}.cell`)
									.data(row.filter(function(d) { return d.z; }))
									.enter().append("rect")
									.attr("class", `${_var._class} cell`)
									.attr("x", function(d) { return _var.xScale(d.x); })
									.attr("width",  _var.xScale.bandwidth())
									.attr("height", _var.xScale.bandwidth())
									.style("fill-opacity", function(d) { return _var.zScale(d.z); })
									.style("fill", function(d) { 
                    return _var.nodes[d.x].group == _var.nodes[d.y].group ? 
                      _var.colors.scale(_var.nodes[d.x].group) : null; });
										//.on("mouseover", mouseover)
										//.on("mouseout", mouseout);

              }

              _var.g.append("rect")
               	.attr("class", `${_var._class} background`)
                .attr("width", _var.width)
                .attr("height", _var.height);

              _var.row = _var.wrap.selectAll(`.${_var._class}.row`)
                .data(_var.matrix)
                .enter().append("g")
                .attr("class", "${_var._class} row")
                .attr("transform", function(d, i) { return "translate(0," + _var.xScale(i) + ")"; })
                .each(row);

              _var.row.append("line")
                .attr("x2", _var.width);

              _var.row.append("text")
                .attr("x", -6)
                .attr("y", _var.xScale.bandwidth() / 2)
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text(function(d, i) { return _var.nodes[i].name; });

              _var.column = _var.wrap.selectAll(`.${_var._class}.column`)
                .data(_var.matrix)
                .enter().append("g")
                .attr("class", "${_var._class} column")
                .attr("transform", function(d, i) { 
                  return "translate(" + _var.xScale(i) + ")rotate(-90)"; });

              _var.column.append("line")
                .attr("x1", -_var.width);

              _var.column.append("text")
                .attr("x", 6)
                .attr("y", _var.xScale.bandwidth() / 2)
                .attr("dy", ".32em")
                .attr("text-anchor", "start")
                .text(function(d, i) { return _var.nodes[i].name; });


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
