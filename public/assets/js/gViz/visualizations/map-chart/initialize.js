'use strict';

gViz.vis.map.initialize = function() {
  "use strict";

  // Get attributes values
  var _id         = null;
  var _var        = null;
  var animation   = 900;
  var container   = null;
  var colors      = { main: gViz.shared.helpers.colors.main, aux: gViz.shared.helpers.colors.aux };
  var data        = [];
  var height      = null;
  var margin      = { top: 10, right: 10, bottom: 10, left: 10 };
  var mode        = { heat: true };
  var width       = null;
  var tile        = "default";
  var startPoint  = null;
  var zoom        = null;

  // Validate attributes
  var validate = function(step) {
    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Initialize variables
          if (!_var) { _var = {}; }
          _var._id = _id;
          _var.animation = animation;
          _var.colors = colors;
          _var.margin = margin;
          _var.mode  = data.mode || mode;

          // Id for shadows
          _var.shadowId = `vis-shadow-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`

          // Resets map wrapper height, so the container value is updated
          // correctly
          if(_var.mapWrapper) { _var.mapWrapper.style("height", "0px"); }

          // Get container
          _var.container = {
            selector: container,
            d3: d3.select(container),
            el: d3.select(container).node(),
            clientRect: d3.select(container).node().getBoundingClientRect()
          };

          // Get data
          _var.data = data;

          // Set zoom transform
          if(_var.zoomTransform == null) { _var.zoomTransform = { k: 1, x: _var.margin.left, y: _var.margin.right }; }

          // Define height and width
          _var.height = ((height != null) ? height : _var.container.clientRect.height) - (_var.margin.top + _var.margin.bottom);
          _var.width = ((width != null) ? width : _var.container.clientRect.width) - (_var.margin.left + _var.margin.right);

          // Set attribute _id to container
          _var.container.d3.attr('data-vis-id', _var._id);

          // NO DATA AVAILABLE
          if (_var.data.length === 0) {
            _var.container.d3.html("<h5 style='line-height: "+(_var.container.clientRect.height)+"px; text-align: center;'>NO DATA AVAILABLE</h5>");
          } else { _var.container.d3.selectAll("h5").remove(); }

          _var.headerWrapper = _var.container.d3.selectAll(".header-wrapper").data(["header-wrapper"]);
          _var.headerWrapper.exit().remove();
          _var.headerWrapper = _var.headerWrapper.enter().append("div").attr("class", "header-wrapper").merge(_var.headerWrapper);

          _var.mapWrapper = _var.container.d3.selectAll(".map-wrapper").data(["map-wrapper"]);
          _var.mapWrapper.exit().remove();
          _var.mapWrapper = _var.mapWrapper.enter().append("div").attr("class", "map-wrapper").merge(_var.mapWrapper);

          _var.mapWrapper
            .attr("class", "map-wrapper")
            .style("height", (_var.height - 70) + "px")
            .style("margin-top", _var.margin.top);

          // Tile to be loaded
          _var.tile = tile;

          // Loading point
          _var.startPoint = startPoint;

          // Map Zoom on init
          _var.zoom = zoom;

          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id','_var','animation','container','colors','data','height','margin','mode','width', 'tile', 'startPoint', 'zoom'].forEach(function(key) {

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

  // Execute the specific called function
  main.run = _ => main('run');

  return main;
};
