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
  let margin    = { top: 1, right: 1, bottom: 1, left: 1 };
  let width     = undefined;

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
          //main('scale');
          //main('axis');
          //main('elements');
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

        // Create initial elements
        case 'create':

          // Creating
          _var = gViz.vis.wordtree.create()
            ._var(_var)
            .run();
          break;

        // Setup scale
        case 'scale':

          // Creating
          _var = gViz.vis.wordtree.scale()
            ._var(_var)
            .action('update-domain')
            .run();
          break;

        // Setup axis elements
        case 'axis':

          // Creating
          _var = gViz.vis.wordtree.axis()
            ._var(_var)
            .action('create')
            .run();
          break;

        // Setup elements
        case 'elements':

          // Drawing elements
          _var = gViz.vis.wordtree.elements()
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
