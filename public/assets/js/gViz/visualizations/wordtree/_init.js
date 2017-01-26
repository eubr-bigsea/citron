// Initialize the visualization class
gViz.vis.wordtree = function() {
  "use strict";

  // Get attributes values
  let _id       = `vis-wordtree-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  let _var      = undefined;
  let action    = 'build';
  let animation = 900;
  let click     = { selector: 'svg', fn(d) { if (d == null) { d = "Clicked"; } return console.log(d); } };
  let colors    = { scale: gViz.helpers.colors.main };
  let container = undefined;
  let data      = [];
  let height    = undefined;
  let margin    = { top: 10, right: 10, bottom: 10, left: 30 };
  let width     = undefined;

  // Validate attributes
  let validate = function(step) {

    switch (step) {
      case 'build':      return (container != null) && $(container).length !== 0;
      case 'initialize': return true;
      case 'helpers':    return true;
      case 'create':     return data.length !== 0;
      case 'data_':      return data.length !== 0;
      case 'setup':      return data.length !== 0;
      case 'bind':       return data.length !== 0;
      case 'tooltip':    return data.length !== 0;
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
          main('helpers');
          main('data_');
          main('create');
          main('setup');
          //main('bind');
          //main('tooltip');
          break;

        // Initialize visualization variable
        case 'initialize':

          // Initializing
          if (!_var) { _var = {}; }
          _var = gViz.vis.wordtree.initialize()
            ._var(_var)
            ._id((_var._id != null) ? _var._id : _id)
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

        // Setup elements
        case 'bind':

          // Bind elements action
          _var = gViz.vis.wordtree.bind()
            ._var(_var)
            .action('click')
            .run();
          break;

        // Setup Tooltip
        case 'tooltip':

          // Create tooltip
          _var = gViz.vis.wordtree.tooltip()
            ._var(_var)
            .element(_var.container.d3.select('.chart-elements').node())
            .action('create')
            .run();

          // Bind tooltip
          _var = gViz.vis.wordtree.tooltip()
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
  ['_id','_var','action','animation','click','colors','container','data','height','margin','width'].forEach(function(key) {

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
  main.helpers        = _ => main("helpers");
  main.create         = _ => main("create");
  main.data_          = _ => main("data_");
  main.setup          = _ => main("setup");
  main.bind           = _ => main("bind");
  main.tooltip        = _ => main("tooltip");

  // Execute the specific called function
  main.run = _ => main(_);

  return main;
};
