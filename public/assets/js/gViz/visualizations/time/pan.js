// Initialize the visualization class
gViz.vis.time.pan = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  let animation = 900;
  let action    = 'run';
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
