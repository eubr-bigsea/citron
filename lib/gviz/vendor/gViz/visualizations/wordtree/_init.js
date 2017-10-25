gViz.vis.wordtree = function () {
  "use strict";

  // Get attributes values
  var _id       = 'vis-wordtree-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _var      = null;
  var action    = 'build';
  var animation = 900;
  var click     = { selector: 'svg', fn: function fn(d) { if (d == null) { d = "Clicked"; } return console.log(d); } };
  var colors    = { scale: gViz.shared.helpers.colors.main };
  var container = null;
  var data      = [];
  var height    = null;
  var margin    = { top: 10, right: 10, bottom: 10, left: 10 };
  var width     = null;

  // Validate attributes
  var validate = function validate(step) {
    switch (step) {
      case 'build':      return container != null && $(container).length !== 0;
      case 'initialize': return true;
      case 'helpers':    return true;
      case 'create':     return data.length !== 0;
      case 'data_':      return data.length !== 0;
      case 'setup':      return data.length !== 0;
      default:           return false;
    }
  };

  // Main function
  var main = function main(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'build':

          main('initialize');
          main('create');
          main('helpers');
          main('data_');
          main('create');
          main('setup');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) {
            _var = {};
          }
          _var = gViz.vis.wordtree.initialize()
            ._var(_var)
            ._id(_var._id != null ? _var._id : _id)
            .animation(animation)
            .click(click)
            .colors(colors)
            .container(container)
            .data(data)
            .height(height)
            .margin(margin)
            .width(width)
            .run();
          break;

        // Initialize helpers functions
        case 'helpers':

          // Initialize helpers functions
          _var = gViz.vis.wordtree.helpers()
            ._var(_var)
            .run();
          break;

        // Parse data
        case 'data_':

          // Creating
          _var = gViz.vis.wordtree.data_()
            ._var(_var)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating
          _var = gViz.vis.wordtree.create()
            ._var(_var)
            .run();
          break;

        // Setup elements
        case 'setup':

          // Creating
          _var = gViz.vis.wordtree.setup()
            ._var(_var)
            .run();
          break;

      }
    }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation', 'click', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function (key) {

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

  // Secondary functions
  main.build = function (_) {
    return main("build");
  };
  main.initialize = function (_) {
    return main("initialize");
  };
  main.helpers = function (_) {
    return main("helpers");
  };
  main.create = function (_) {
    return main("create");
  };
  main.data_ = function (_) {
    return main("data_");
  };
  main.setup = function (_) {
    return main("setup");
  };

  // Execute the specific called function
  main.run = function (_) {
    return main(_);
  };

  return main;
};
