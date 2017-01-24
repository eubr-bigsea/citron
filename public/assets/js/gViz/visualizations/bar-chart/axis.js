gViz.vis.bar_chart.axis = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  var action    = 'create';
  var animation = 900;
  var grid      = true;

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

            case 'create':

              // Append X Axis
              _var.xAxis = _var.g.append("g")
                .attr("class", `${_var._class} x axis`)
                .attr("transform", "translate(0," + _var.height + ")")
                .call(d3.axisBottom(_var.xScale));

              // Append Y Axis
              _var.yAxis = _var.g.append("g")
                .attr("class", `${_var._class} y axis`)
                .call(d3.axisLeft(_var.yScale));

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','action','animation', 'grid'].forEach(function(key) {

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
