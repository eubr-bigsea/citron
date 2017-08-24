gViz.vis.graph = function () {

  "use strict";

  // Initialize variables
  var _id       = "vis-graph-" + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _var      = null;
  var action    = 'build';
  var animation = 900;
  var colors    = { scale: gViz.shared.helpers.colors.d310 };
  var container = null;
  var data      = [];
  var height    = null;
  var margin    = { top: 0, right: 0, bottom: 50, left: 0 };
  var width      = null;

  // Validate function
  var validate = function (step) {
    switch (step) {
      case 'build':      return container != null && $(container).length !== 0;
      case 'initialize': return true;
      case 'create':     return true;
      case 'setup':      return true;
      case 'zoom':       return true;
      case 'drag':       return true;
      case 'brush':      return true;
      case 'bind':       return true;
      case 'tooltip':    return true;
      case 'search':     return true;
      case 'label':      return true;
      default:           return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate step first
    if (validate(step)) {

      // Each step
      switch (step) {

        // Build visualization
        case 'build':

          main('initialize');
          main('create');
          main('setup');
          main('zoom');
          main('drag');
          main('brush');
          main('tooltip');
          main('bind');
          main('search');
          main('label');
          break;

        // Initialize variables
        case 'initialize':

          _var || (_var = {});
          _var = gViz.vis.graph.initialize()
            ._var(_var)
            ._id(_var._id != null ? _var._id : _id)
            .animation(animation)
            .colors(colors)
            .container(container)
            .data(data)
            .height(height)
            .margin(margin)
            .width(width)
            .run();

          break;

        // Create wrappers
        case 'create':

          _var = gViz.vis.graph.create()
            ._var(_var)
            .run();
          break;

        // Setup skeleton
        case 'setup':

          _var = gViz.vis.graph.setup()
            ._var(_var)
            .run();
          break;

        // Zoom function
        case 'zoom':
          _var = gViz.vis.graph.zoom()
            ._var(_var)
            .run();
          break;

        // Drag function
        case 'drag':
          _var = gViz.vis.graph.drag()
            ._var(_var)
            .action('bind')
            .run();
          break;

        // Set brush
        case 'brush':
          _var = gViz.vis.graph.brush()._var(_var).action('reset').run();
          _var = gViz.vis.graph.brush()._var(_var).action('bind').run();
          break;

        // Create tooltips
        case 'tooltip':
          _var = gViz.vis.graph.tooltip()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Bind events
        case 'bind':
          _var = gViz.vis.graph.bind()._var(_var).action('mouse').run();
          _var = gViz.vis.graph.bind()._var(_var).action('buttons').run();
          _var = gViz.vis.graph.bind()._var(_var).action('list-items').run();
          _var = gViz.vis.graph.bind()._var(_var).action('resize').run();
          break;

        // Bind search field
        case 'search':
          _var = gViz.vis.graph.search()
            ._var(_var)
            .run();
          break;

        // Create labels
        case 'label':
          _var = gViz.vis.graph.label()
            ._var(_var)
            .run();
          break;

      }
    }

    return _var;
  };

  // Public variables
  ['_id', '_var', 'action', 'animation', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function (key) {

    // Validate function
    validate[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return validate;
    };

    // Main function
    return main[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return main;
    };

  });

  // Set build function
  main.build = function (_) { return main("build"); };

  return main;
};
