'use strict';

// Initialize the visualization class
gViz.vis.map = function () {
  "use strict";

  // Get attributes values

  var _id = 'vis-maps-' + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  var _class = undefined;
  var _var = undefined;
  var action = 'build';
  var container = undefined;
  var data = undefined;
  var height = undefined;
  var width = undefined;
  var tile  = "default";
  var startPoint = [-19.9245, -43.9352];
  var mapZoom = 13;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'build':
        return container != null && $(container).length !== 0;
      case 'initialize':
        return true;
      case 'tiles':
        return true;
      case 'create':
        return true;
      case 'addMarkers':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {

    //Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'build':

          main('initialize');
          main('tiles');
          main('create');
          main('addMarkers');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) {
            _var = {};
          }

          _var = gViz.vis.map.initialize()
            ._var(_var)
            ._id(_var._id != null ? _var._id : _id)
            ._class(_class)
            .container(container)
            .data(data)
            .height(height)
            .width(width)
            .tile(tile)
            .startPoint(startPoint)
            .mapZoom(mapZoom)
            .run();

          break;

        // Setup initial elements
        case 'tiles':

          // Setup
          _var = gViz.vis.map.tiles()
            ._var(_var)
            .run();

          break;

        // Create initial elements
        case 'create':

          // Creating
          _var = gViz.vis.map.create()
            ._var(_var)
            .run();

          break;

        // Create initial elements
        case 'addMarkers':

          // Creating
          _var = gViz.vis.map.addMarkers()
            ._var(_var)
            .run();

          break;

      }
    }

    return _var;
  };

  //  Expose global variables
  ['_id', '_class', '_var', 'action', 'container', 'data', 'height', 'width', 'tile', 'startPoint', 'mapZoom'].forEach(function (key) {

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
  main.create = function (_) {
    return main("create");
  };
  main.setup = function (_) {
    return main("setup");
  };
  main.draw = function (_) {
    return main("draw");
  };

  // Execute the specific called function
  main.run = function (_) {
    return main(_);
  };

  return main;
};