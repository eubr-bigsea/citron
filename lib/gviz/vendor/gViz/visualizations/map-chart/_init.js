'use strict';

// Initialize the visualization class
gViz.vis.map = function () {
  "use strict";

  // Auxiliar Functions
  var components = {
    initialize:     gViz.vis.map.initialize,
    barScale:       gViz.vis.map.barScale,
    create:         gViz.vis.map.create,
    elements:       gViz.vis.map.elements,
    events:         gViz.vis.map.events,
    heatLayer:      gViz.vis.map.heatLayer,
    geoJsonLayer:   gViz.vis.map.geoJsonLayer,
    legend:         gViz.vis.map.legend,
    renderMap:      gViz.vis.map.renderMap,
    tiles:          gViz.vis.map.tiles,
    style:          gViz.vis.map.style,
    zoom:           gViz.vis.map.zoom,
    misc:           gViz.vis.map.misc,
  };

  // Get attributes values

  // Get attributes values
  var _id         = `vis-map-chart-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var _var        = null;
  var action      = 'build';
  var animation   = 900;
  var container   = null;
  var colors      = { main: gViz.shared.helpers.colors.main, d3: d3.scaleOrdinal(d3.schemeCategory10) };
  var data        = [];
  var height      = null;
  var margin      = { top: 10, right: 10, bottom: 10, left: 10};
  var mode        = { heat: true };
  var width       = null;
  var tile        = "default";
  var startPoint  = null;
  var zoom        = null;

  // Validate attributes
  var validate = function (step) {
    switch (step) {
      case 'build':         return (container != null) && (d3.selectAll(container).size() !== 0 || d3.select(container).size() !== 0);
      case 'initialize':    return true;
      case 'barScale':      return data != null && data.data != null;
      case 'create':        return data != null && data.data != null;
      case 'elements':      return data != null && data.data != null;
      case 'heatLayer':     return data != null && data.data != null;
      case 'geoJsonLayer':  return data != null && data.data != null;
      case 'renderMap':     return data != null && data.data != null;
      case 'legend':        return data != null && data.data != null;
      case 'style':         return true;
      case 'tiles':         return data != null && data.data != null;
      case 'zoom':          return data != null && data.data != null;
      case 'misc':          return data != null && data.data != null;
      default:              return false;
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
          main('style');
          main('tiles');
          main('renderMap');
          main('barScale');
          main('heatLayer');
          main('geoJsonLayer');
          main('create');
          main('elements');
          main('zoom');
          main('legend');
          main('misc');
          break;


        // Initialize visualization variable
        case 'initialize':

          if (!_var) { _var = {};  }

          //_var = gViz.vis.map.initialize()
          _var = components.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .container(container)
            .colors(colors)
            .data(data)
            .height(height)
            .margin(margin)
            .mode(mode)
            .width(width)
            .tile(tile)
            .startPoint(startPoint)
            .zoom(zoom)
            .run();

          break;

        // Initialize tiles
        case 'tiles':

          // Setup
          _var = components.tiles()
            ._var(_var)
            .run();

          break;

        // Create initial elements
        case 'renderMap':

          // Creating wrappers
          _var = components.renderMap()
            ._var(_var)
            .run();
          break;

        // Set bar scale
        case 'barScale':

          // Set bar scale
          _var = components.barScale()
            ._var(_var)
            .data(_var.data.data == null ? [] : _var.data.data)
            .run();
          break;

        // Create initial elements
        case 'heatLayer':

          // Creating wrappers
          _var = components.heatLayer()
            ._var(_var)
            .run();
          break;

        // Create initial elements
        case 'geoJsonLayer':

          // Creating wrappers
          _var = components.geoJsonLayer()
            ._var(_var)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating wrappers
          _var = components.create()
            ._var(_var)
            .run();
          break;

        // Setup elements
        case 'elements':

          // Creating wrappers
          _var = components.elements()
            ._var(_var)
            .components(components)
            .run();
          break;

        // Set style
        case 'style':

          // Set styling functions
          _var = components.style()
            ._var(_var)
            .run();
          break;

        case 'zoom':

          // Creating wrappers
          _var = components.zoom()
            ._var(_var)
            .run();
          break;

        // Show legend
        case 'legend':

          // Running
          _var = components.legend()
            ._var(_var)
            .components(components)
            .run();
          break;

        // Show legend
        case 'misc':

          // Running
          _var = components.misc()
            ._var(_var)
            .components(components)
            .run();
          break;
      }
    }

    else { console.log("Failed to validate on step " + step); }

    return _var;
  };

  // Expose global variables
  ['_id', '_var', 'action', 'animation','container', 'colors', 'data', 'height', 'margin','mode','width', 'tile', 'startPoint', 'zoom'].forEach(function (key) {

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
