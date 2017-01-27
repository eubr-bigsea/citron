// Initialize the visualization class
gViz.vis.time = function() {
  "use strict";

  // Get attributes values
  let _id       = `vis-time-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  let _var      = undefined;
  let action    = 'build';
  let animation = 900;
  let axisY     = { zero: true };
  let click     = { selector: 'svg', fn(d) { if (d == null) { d = "Clicked"; } return console.log(d); } };
  let colors    = { scale: gViz.helpers.colors.main };
  let container = undefined;
  let data      = [];
  let height    = undefined;
  let margin    = { top: 10, right: 1, bottom: 30, left: 40 };
  var pan       = {};
  var reference = new Date();
  let shape     = 'area';
  var timespan  = 6000;
  let width     = undefined;
  var zoom      = {};

  // Validate attributes
  let validate = function(step) {

    switch (step) {
      case 'build':          return (container != null) && $(container).length !== 0;
      case 'initialize':     return true;
      case 'create':         return data.length !== 0;
      case 'scale':          return data.length !== 0;
      case 'axis':           return data.length !== 0;
      case 'elements':       return data.length !== 0;
      case 'bind':           return data.length !== 0;
      case 'zoom':           return data.length !== 0;
      case 'pan':            return data.length !== 0;
      case 'tooltip':        return data.length !== 0;
      default: return false;
    }
  };

  // Main function
  let main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'build':

          main('initialize');
          main('create');
          main('scale');
          main('axis');
          main('elements');
          main('zoom');
          //main('pan');
          main('bind');
          main('tooltip');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) { _var = {}; }
          _var = gViz.vis.time.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
            .animation(animation)
            .click(click)
            .colors(colors)
            .container(container)
            .data(data)
            .height(height)
            .margin(margin)
            .pan(pan)
            .reference(reference)
            .shape(shape)
            .timespan(timespan)
            .width(width)
            .zoom(zoom)
            .axisY(axisY)
            .run();
          break;

        // Create initial elements
        case 'create':

          // Creating
          _var = gViz.vis.time.create()
            ._var(_var)
            .run();
          break;

        // Setup scale
        case 'scale':

          // Creating
          _var = gViz.vis.time.scale()
            ._var(_var)
            .action('update-domain')
            .run();
          break;

        // Setup axis elements
        case 'axis':

          // Creating
          _var = gViz.vis.time.axis()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Setup elements
        case 'elements':

          // Drawing elements
          _var = gViz.vis.time.elements()
            ._var(_var)
            .run();
          break;

        // Setup elements
        case 'bind':

          // Bind elements action
          _var = gViz.vis.time.bind()
            ._var(_var)
            .action('click')
            .run();
          break;

        // Setup zoom
        case 'zoom':

          // Bind zoom action
          _var = gViz.vis.time.zoom()
            ._var(_var)
            .parent(main)
            .run();

          break;

        // Setup pan
        case 'pan':

          // Bind pan action
          _var = gViz.vis.time.pan()
            ._var(_var)
            .run();
          break;

        // Setup Tooltip
        case 'tooltip':

          // Create tooltip
          _var = gViz.vis.time.tooltip()
            ._var(_var)
            .element(_var.container.d3.select('.chart-elements').node())
            .action('create')
            .run();

          // Bind tooltip
          _var = gViz.vis.time.tooltip()
            ._var(_var)
            .element(_var.container.d3.select('.chart-elements').node())
            .action('bind')
            .run();
          break;
      }
    }

    return _var;
  };

  // Expose global variables
  ['_id','_var','action','animation','axisY','click','colors','container','data','height','margin','pan','reference','shape','timespan','width','zoom'].forEach(function(key) {

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

  // Secondary functions
  main.build          = _ => main("build");
  main.initialize     = _ => main("initialize");
  main.create         = _ => main("create");
  main.scale          = _ => main("scale");
  main.axis           = _ => main("axis");
  main.elements       = _ => main("elements");
  main.bind           = _ => main("bind");
  main.tooltip        = _ => main("tooltip");

  // Execute the specific called function
  main.run = _ => main(_);

  return main;
};
