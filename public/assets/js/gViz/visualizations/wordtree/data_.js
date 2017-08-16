'use strict';

// Initialize the visualization class

gViz.vis.wordtree.data_ = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var duration = 500;

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

          // Declares a tree layout and assigns the size
          _var.treemap = d3.tree().size([_var.height, _var.width]);

          // Assigns parent, children, height, depth
          _var.root = d3.hierarchy(_var._data, function (d) {
            return d.children;
          });
          _var.root.x0 = _var.height / 2;
          _var.root.y0 = 0;

          // Declare child levels
          _var.i = 0;
          _var.depth = { max: 0, current: 0 };
          _var.offset = { x: 4, y: 20 };

          //// Calculate levels sizes
          //_var.getLevelSizes(_var.root);

          // Calculate initial values
          _var.getValues(_var.root);

          // Update font scale domain
          _var.fontScale.domain([1, d3.max(_var.root.children, function (d) { return d._value; })]);

          //// Collapse after the third level
          //_var.root.children.forEach( function(c) { return if(c.children) { c.children.forEach(_var.collapse) }; } );

          // Reset sizes based on tree
          _var.resetSizes();

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'duration'].forEach(function (key) {

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

  // Executa a funcao chamando o parametro de step
  main.run = function (_) {
    return main('run');
  };

  return main;
};
