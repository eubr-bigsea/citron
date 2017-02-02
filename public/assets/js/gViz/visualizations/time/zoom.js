"use strict";

// Initialize the visualization class
gViz.vis.time.zoom = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var animation = 900;
  var action = 'run';
  var selector = undefined;
  var parent = function parent(d) {
    return console.log("parent");
  };

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

        // Run
        case 'run':

          // INitialize variables
          var diff = void 0;

          // On zoom start function
          _var.zoom.start = function () {

            // Add grabbing cursor
            _var.wrap.classed("grabbing", true);

            // Add force hide tooltip
            d3.select('.tooltipster-visualization').classed("force-hide", true);
          };

          // On zoom end function
          _var.zoom.end = function () {

            // Remove grabbing cursor
            _var.wrap.classed("grabbing", false);

            // Remove force hide and hide tooltip
            d3.select('.tooltipster-visualization').classed("force-hide", false).style('display', 'none');
          };

          // On zoom function
          _var.zoom.callback = function () {

            if (d3.event != null && d3.event.transform != null) {

              // Store event
              event = d3.event;

              // Event transformation bounds
              var limits = {
                min_x: _var.width - _var.width * event.transform.k,
                max_x: 0
              };

              // Event transformation bounds
              if (event.transform.x < limits.min_x) {

                // Reset event transform
                event.transform.x = limits.min_x;

                // Get scale from transformation
                _var._x = d3.event.transform.rescaleX(_var.x);

                // Run zoom function
                _var.zoom.fn(d3.timeFormat("%H:%M:%S.%L")(new Date(_var._x.domain()[1])));

                return;
              } else if (event.transform.x > limits.max_x) {

                // Reset event transform
                event.transform.x = limits.max_x;

                // Run zoom function
                _var.zoom.fn(d3.timeFormat("%H:%M:%S.%L")(new Date(_var._x.domain()[0])));

                //// Run zoom function
                //_var.zoom.fn();

                //return;
              }

              // Get scale from transformation
              _var._x = d3.event.transform.rescaleX(_var.x);

              // Store previous transformation
              _var.zoom.transform = event.transform;

              // Update axis
              _var.x_axis.call(_var.xAxis.scale(_var._x));

              // Update elements
              parent('elements');
            }
          };

          // Initialize scale and translate tranformatiosn
          if (_var.zoom.transform == null) _var.zoom.transform = { k: 1, x: _var.margin.left, y: _var.margin.top };

          // D3 zoom behaviour
          _var.zoom.behaviour = d3.zoom().scaleExtent([1, 10]).on("start", _var.zoom.start).on("end", _var.zoom.end).on("zoom", _var.zoom.callback);

          // Bind zoom behaviour to svg
          _var.wrap.call(_var.zoom.behaviour);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'animation', 'action', 'selector', "parent"].forEach(function (key) {

    // Attach variables to validation function
    validate[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return validate;
    };

    // Attach variables to main function
    return main[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return main;
    };
  });

  // Executa a funcao chamando o parametro de step
  main.run = function (_) {
    return main('run');
  };

  return main;
};
