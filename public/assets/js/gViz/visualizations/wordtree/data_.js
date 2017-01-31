// Initialize the visualization class
gViz.vis.wordtree.data_ = function() {
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

          // Declares a tree layout and assigns the size
          _var.treemap = d3.tree().size([_var.height, _var.width]);

          // Assigns parent, children, height, depth
          _var.root = d3.hierarchy(_var._data, d => d.children);
          _var.root.x0 = _var.height / 2;
          _var.root.y0 = 0;

          // Declare child levels
          _var.i = 0;
          _var.depth = { max: 0, current: 0 };
          _var.offset = { x: 5, y: 20 };

          //// Calculate levels sizes
          //_var.getLevelSizes(_var.root);

          // Calculate initial values
          _var.getValues(_var.root);

          // Update font scale domain
          _var.fontScale.domain([1, d3.max(_var.root.children, d => d._value)]);

          //// Collapse after the third level
          //_var.root.children.forEach( c => { if(c.children) { c.children.forEach(_var.collapse) }; });

          // Reset sizes based on tree
          _var.resetSizes();

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
