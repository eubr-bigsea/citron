gViz.vis.bar_chart.sort = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  var action    = 'sort';
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

            case 'sort':

              // Binds button to sort function
              d3.select("#order").on("change", function() {
                let value = this.value;
                sort(value);
              });

              let sort = function(value) {
                // Updates scales domain
                
                switch(value) {
                  
                  case "alphabetically":

                    var x0 = _var.xScale.domain(_var._data.sort(function(a, b) 
                      { return d3.ascending(a["discrete"], b["discrete"]); })
                      .map(function(d) { return d["discrete"]; }))
                      .copy();

                    break;

                  default:
                    var x0 = _var.xScale.domain(_var._data.sort(function(a, b) 
                      { return d3[value](a["continuous"], b["continuous"]); })
                      .map(function(d) { return d["discrete"]; }))
                      .copy();

                }

								var t = _var.g.transition().duration(500);
             		var delay = function(d, i) { return i * 50; };

                t.selectAll(`.${_var._class}.bar`)
                  .delay(delay)
                  .attr("x", function(d) { return x0(d["discrete"]); });

                t.select(`.${_var._class}.x.axis`)
                  .call(d3.axisBottom(x0))
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
