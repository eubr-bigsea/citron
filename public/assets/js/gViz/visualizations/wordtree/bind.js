// Initialize the visualization class
gViz.vis.time.bind = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  let animation = 900;
  let action    = 'click';
  let selector = undefined;

  // Validate attributes
  let validate = function(step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  let main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Run
        case 'run':

          switch (action) {

            // Bind click event
            case 'click':

              if ((_var.click.selector != null) && $(_var.click.selector).length !== 0) {

                // Bind click to selector
                _var.container.d3.selectAll(_var.click.selector).on('click', function(d) {

                  // Get clicked element
                  let element = this;

                  // Get mouse event and object position from mouse
                  let event = (d3.event ? d3.event : window.event);
                  let pos = d3.mouse(element);

                  // Get valid date
                  let date = _var.x.invert(d3.mouse(this)[0]);

                  // Get position of label
                  let bisect = _var.tooltip.bisect(_var.data, date);
                  if (bisect > 0 && bisect < _var.data.length-1) {
                    let x0 = _var.x(_var.data[bisect-1].date);
                    let x1 = _var.x(_var.data[bisect].date);
                    bisect = (pos[0] - x0) >= ((x1-x0)/2) ? bisect : bisect-1;
                  }

                  // Get valid date
                  let valid_date = _var.data[bisect];

                  // If the date is valid
                  if (valid_date != null) {

                    // Run click function
                    return _var.click.fn(valid_date);

                  }
                });
              }
              break;
          }
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','animation','action','selector'].forEach(function(key) {

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

  // Executa a funcao chamando o parametro de step
  main.run = _ => main('run');

  return main;
};
