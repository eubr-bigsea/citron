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
									.attr("x", function(d, i) { return _var.xScale(d.y); })
									.attr("y", function(d) { return _var.yScale(d.x); })
									.attr("width",  _var.xScale.bandwidth())
									.attr("height", _var.yScale.bandwidth())
									.style("fill-opacity", function(d) { return _var.zScale(d.z); })
									.style("fill", function(d) {
                    return _var.colors.scale(_var.matrix[d.x][d.y].z); 
                  })
              }

              // Appends matrix placeholder
              // _var.background = _var.g//.selectAll(`.${_var._class}.background`)
              //   .data(["matrix-background-x"]).enter()
              //   .append("rect")
              //  	.attr("class", `${_var._class} background`)
              //   .attr("width", _var.matrix_width)
              //   .attr("height", _var.matrix_height);


              // For each row appends the rectangles
              _var.row = _var.g.selectAll(`.${_var._class}.row`)
                .data(_var.matrix)
                .enter().append("g")
                .attr("class", `${_var._class} row`)
                .each(row);

              // Appends rows division lines
              _var.row.append("line")
                .attr("class", `${_var._class} row line`)
                .attr("x2", _var.matrix_width)
                .attr("transform", function(d, i) { 
                  return "translate(0," + _var.yScale(i) + ")"; })
              
              // Rows labels
              _var.row.append("text")
                .attr("class", `${_var._class} row text`)
                .attr("x", -6)
                .attr("transform", (d, i) => { 
                  return `translate(0, ${_var.yScale(i) + (_var.yScale.bandwidth() / 2)})`;
                })
                .attr("dy", ".32em")
                .attr("text-anchor", "end")
                .text(function(d, i) { return _var._data.rows[i].name; });

              // Appends columns division lines
              _var.column = _var.g.selectAll(`.${_var._class}.column`)
                .data(_var.matrix[0])
                .enter().append("g")
                .attr("class", `${_var._class} column`);

              _var.column.append("line")
                .attr("class", `${_var._class} column line`)
                .attr("y2", _var.matrix_height)
                .attr("transform", function(d, i) { 
                  return "translate(" + _var.xScale(i) + ",0)"; });

              // Appends columns labels
              _var.column.append("text")
                .attr("class", `${_var._class} column text`)
                .attr("x", 40)
                .attr("transform", (d, i) => { 
                  return `translate(${_var.xScale(i) + (_var.xScale.bandwidth() / 2)} ,0) rotate(-90)`;
                })
                .attr("dy", ".32em")
                .attr("text-anchor", "middle")
                .text(function(d, i) { return _var._data.columns[i].name; });

              if(_var.matrix_width < $(_var.container.el).width() && 
                _var.matrix_height < $(_var.container.el).height()) {

                _var.g
                  .attr("transform", `translate(${($(_var.container.el).width()/2)  - (_var.matrix_width/2)}, 
                                                ${($(_var.container.el).height()/2) - (_var.matrix_height/2)})`
                       );
              } 

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
