// Module declaration
gViz.shared.visualComponents.backgroundGrid = function () {
  "use strict";

  // Get attributes values
  var _var       = null;
  var id         = `vis-shadow-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var height     = 100;
  var left       = 0;
  var top        = 0;
  var width      = 100;
  var wrap       = null;

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

          // Create background grid
          var gridBg = wrap.selectAll(`.grid-${id}`).data(["chart-svg"]);
          gridBg.exit().remove();
          gridBg = gridBg.enter().insert("div", ":first-child").attr('class', `grid-background grid-${id}`).merge(gridBg); // svg

          // Update outer dimensions
          gridBg
            .style("top",  (top) + 'px')
            .style("height", (left) + 'px')
            .style("width",  (width) + 'px')
            .style("height", (height) + 'px');

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','id','height','left','width','top','wrap'].forEach(function (key) {

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

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) { range.push(i); }
  return range;
}
