'use strict';

gViz.vis.pie_chart.sort = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'sort';
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
          (function () {

            switch (action) {

              case 'sort':

							  var arcTween = function (d) {

							  	var i = d3.interpolate(this._current, d);

							  	this._current = i(0);

							  	return function(t) {
							  		return _var.arc(i(t))
							  	}
                }


                // Binds button to sort function
                d3.select("#order").on("change", function () {
                  var value = this.value;
                  sort(value);
                });

                var sort = function sort(value) {

                  // Updates scales domain

                  switch (value) {

                    case "alphabetically":

                      _var._data.sort(function (a, b) { return d3.ascending(a["label"], b["label"]); });
                      break;

                    default:
                      _var._data.sort(function (a, b) { return d3[value](a["value"], b["value"]); });

                  }

                  _var.pie.value(function(d) { return d["value"]; });

                  // Updates Path
                  _var.path = _var.path
                    .data(_var.pie(_var._data))
                    .style("fill", function(d) {
                      return _var.colours_hash[d["data"]["label"]];
                  });

                  // Transitions to new path
                  _var.path
                    .transition()
                    .duration(750)
                    .attrTween("d", arcTween);
                };

                break;
            }
          })();

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
