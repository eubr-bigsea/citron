gViz.vis.graph = function() {
  "use strict";
  var _id, _var, action, animation, colors, container, data, height, main, margin, validate, width;
  _id = "vis-graph-" + (Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5);
  _var = void 0;
  action = 'build';
  animation = 900;
  colors = {
    scale: gViz.helpers.colors.d310
  };
  container = void 0;
  data = [];
  height = void 0;
  margin = {
    top: 0,
    right: 0,
    bottom: 50,
    left: 0
  };
  width = void 0;
  validate = function(step) {
    switch (step) {
      case 'build':
        return (container != null) && $(container).length !== 0;
      case 'initialize':
        return true;
      case 'create':
        return true;
      case 'setup':
        return true;
      case 'zoom':
        return true;
      case 'drag':
        return true;
      case 'brush':
        return true;
      case 'bind':
        return true;
      case 'tooltip':
        return true;
      default:
        return false;
    }
  };
  main = function(step) {
    if (validate(step)) {
      switch (step) {
        case 'build':
          main('initialize');
          main('create');
          main('setup');
          main('zoom');
          main('drag');
          main('brush');
          main('tooltip');
          main('bind');
          break;
        case 'initialize':
          _var || (_var = {});
          _var = gViz.vis.graph.initialize()._var(_var)._id(_var._id != null ? _var._id : _id).animation(animation).colors(colors).container(container).data(data).height(height).margin(margin).width(width).run();
          break;
        case 'create':
          _var = gViz.vis.graph.create()._var(_var).run();
          break;
        case 'setup':
          _var = gViz.vis.graph.setup()._var(_var).run();
          break;
        case 'zoom':
          _var = gViz.vis.graph.zoom()._var(_var).run();
          break;
        case 'drag':
          _var = gViz.vis.graph.drag()._var(_var).action('bind').run();
          break;
        case 'brush':
          _var = gViz.vis.graph.brush()._var(_var).action('reset').run();
          _var = gViz.vis.graph.brush()._var(_var).action('bind').run();
          break;
        case 'tooltip':
          _var = gViz.vis.graph.tooltip()._var(_var).action('create').run();
          break;
        case 'bind':
          _var = gViz.vis.graph.bind()._var(_var).action('mouse').run();
          _var = gViz.vis.graph.bind()._var(_var).action('buttons').run();
          _var = gViz.vis.graph.bind()._var(_var).action('list-items').run();
          _var = gViz.vis.graph.bind()._var(_var).action('resize').run();
      }
    }
    return _var;
  };
  ['_id', '_var', 'action', 'animation', 'colors', 'container', 'data', 'height', 'margin', 'width'].forEach(function(key) {
    validate[key] = function(_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return validate;
    };
    return main[key] = function(_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return main;
    };
  });
  main.build = function(_) {
    return main("build");
  };
  main.initialize = function(_) {
    return main("initialize");
  };
  main.create = function(_) {
    return main("create");
  };
  main.setup = function(_) {
    return main("setup");
  };
  main.zoom = function(_) {
    return main("zoom");
  };
  main.drag = function(_) {
    return main("drag");
  };
  main.brush = function(_) {
    return main("brush");
  };
  main.bind = function(_) {
    return main("bind");
  };
  main.tooltip = function(_) {
    return main("tooltip");
  };
  main.run = function(_) {
    return main(_);
  };
  return main;
};
