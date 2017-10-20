// Initialize the visualization class
gViz.vis.graph.label = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
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

          // Update selection searched for searched nodes
          var updateLabels = function(isActive) {

            // Show labels
            if(isActive) {

              // Initialize labels
              var labels = ["<span class='label-title'>Group Labels</span>"]

              // Get group labels
              Object.keys(_var.label.values).forEach(function(k) {
                var color = _var.label.values[k];
                labels.push("<div class='label-group'><span class='label-color' style='background-color: "+color+";'></span><span class='label-name'>"+k+"</span></div>");
              });

              // Get centered labels
              if(Object.keys(_var.label.centered).length > 0) { labels.push("<span class='label-title' style='margin-top: 20px;'>Fixed Nodes</span>"); }
              Object.keys(_var.label.centered).forEach(function(k) {
                var color = _var.label.centered[k];
                labels.push("<div class='label-group'><span class='label-color' style='border: 2px solid "+color+";'></span><span class='label-name'>"+k+"</span></div>");
              });



              _var.container.jq.parent().find('.label-wrapper').html(labels.join('')).css('display', 'block');

            // Hide labels
            } else {
              _var.container.jq.parent().find('.label-wrapper').html('').css('display', 'none');
            }

          }

          // Toggle click
          _var.label.d3.on('click', function() {

            // Toggle class
            d3.select(this).classed('active', !d3.select(this).classed('active'));

            // Update labels
            updateLabels(d3.select(this).classed('active'));
          });

          // Update labels
          updateLabels(_var.label.d3.classed('active'));

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation'].forEach(function (key) {

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
