// Initialize the visualization class
gViz.vis.wordtree.helpers = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  let duration = 500;

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

        // Build entire visualizations
        case 'run':

          // Creates a curved (diagonal) path from parent to the child nodes
          _var.diagonal = (s, d)  => { return `M ${s.y} ${s.x} C ${(s.y + d.y) / 2} ${s.x}, ${(s.y + d.y) / 2} ${d.x}, ${d.y} ${d.x}`; }

          // Collapse the node and all it's children
          _var.getLevelSizes = (d, i) => {

            // Increase level
            if(_var.levels.sizes[i] == null) { _var.levels.sizes[i] = 1; }
            else { _var.levels.sizes[i] += 1; }

            // Recursive iteration
            if(d.children) { d.children.forEach( c => _var.getLevelSizes(c, i+1)); }
          }

          // Collapse the node and all it's children
          _var.collapse = (d) => {
            if(d.children) {
              d._children = d.children
              d._children.forEach(_var.collapse)
              d.children = null
            }
          }

          break;
      }
    }


    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','duration'].forEach(function(key) {

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
