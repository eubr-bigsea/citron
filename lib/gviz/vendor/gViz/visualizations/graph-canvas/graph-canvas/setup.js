'use strict';

gViz.vis.graph.setup = function () {
  "use strict";

  var _var, action, animation, main, validate;
  _var = void 0;
  animation = 900;
  action = 'build';
  validate = function validate(step) {
    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };
  main = function main(step) {
    if (validate(step)) {
      switch (step) {
        case 'run':
          (function () {
            switch (action) {
              case 'build':
                _var.drawLink = function (d) {
                  _var.context.beginPath();
                  _var.context.moveTo(d.source.x, d.source.y);
                  _var.context.lineTo(d.target.x, d.target.y);
                  _var.context.globalAlpha = _var.selection.hover != null && (d.source.id === _var.selection.hover.id || d.target.id === _var.selection.hover.id) || _var.selection.clicked[d.source.id] != null || _var.selection.searched[d.source.id] != null || _var.selection.searched[d.target.id] != null || _var.selection.clicked[d.target.id] != null ? 1 : _var.selection.globalAlpha;
                  _var.context.lineWidth = d.width / _var.transform.k;
                  _var.context.strokeStyle = d.color;
                  return _var.context.stroke();
                };
                _var.drawSymbol = function (d) {
                  switch (d.shape) {
                    case 'circle':
                      _var.context.moveTo(d.x + d.radius / _var.transform.k, d.y);
                      return _var.context.arc(d.x, d.y, d.radius / _var.transform.k, 0, 2 * Math.PI);
                    case 'rect':
                      _var.context.moveTo(d.x - d.radius / _var.transform.k, d.y - d.radius / _var.transform.k);
                      _var.context.lineTo(d.x + d.radius / _var.transform.k, d.y - d.radius / _var.transform.k);
                      _var.context.lineTo(d.x + d.radius / _var.transform.k, d.y + d.radius / _var.transform.k);
                      _var.context.lineTo(d.x - d.radius / _var.transform.k, d.y + d.radius / _var.transform.k);
                      return _var.context.lineTo(d.x - d.radius / _var.transform.k, d.y - d.radius / _var.transform.k);
                    case 'triangle-down':
                      _var.context.moveTo(d.x - d.radius / _var.transform.k, d.y - d.radius / _var.transform.k);
                      _var.context.lineTo(d.x + d.radius / _var.transform.k, d.y - d.radius / _var.transform.k);
                      _var.context.lineTo(d.x, d.y + d.radius / _var.transform.k);
                      return _var.context.lineTo(d.x - d.radius / _var.transform.k, d.y - d.radius / _var.transform.k);
                    case 'triangle-up':
                      _var.context.moveTo(d.x, d.y - d.radius / _var.transform.k);
                      _var.context.lineTo(d.x + d.radius / _var.transform.k, d.y + d.radius / _var.transform.k);
                      _var.context.lineTo(d.x - d.radius / _var.transform.k, d.y + d.radius / _var.transform.k);
                      return _var.context.lineTo(d.x, d.y - d.radius / _var.transform.k);
                    case 'diamond':
                      _var.context.moveTo(d.x, d.y - d.radius / _var.transform.k);
                      _var.context.lineTo(d.x + d.radius / _var.transform.k, d.y);
                      _var.context.lineTo(d.x, d.y + d.radius / _var.transform.k);
                      _var.context.lineTo(d.x - d.radius / _var.transform.k, d.y);
                      return _var.context.lineTo(d.x, d.y - d.radius / _var.transform.k);
                    default:
                      _var.context.moveTo(d.x + d.radius / _var.transform.k, d.y);
                      return _var.context.arc(d.x, d.y, d.radius / _var.transform.k, 0, 2 * Math.PI);
                  }
                };
                _var.drawNode = function (d) {

                  // If node is centered
                  if(d.centered) {
                    d.x = _var.width/2  + _var.centered.radius * Math.cos(2 * Math.PI * d.center_index / _var.centered.count);
                    d.y = _var.height/2 + _var.centered.radius * Math.sin(2 * Math.PI * d.center_index / _var.centered.count);
                  }

                  _var.context.beginPath();
                  _var.drawSymbol(d);
                  _var.context.globalAlpha = _var.selection.hover != null && (d.id === _var.selection.hover.id || _var.selection.hover.neighbours[d.id] != null) || _var.selection.clicked[d.id] != null || _var.selection.searched[d.id] != null || _var.selection.neighbours[d.id] != null ? 1 : _var.selection.globalAlpha + .1;

                  _var.context.fillStyle = d.centered ? '#FFF' : d.color;
                  _var.context.fill();
                  _var.context.strokeStyle = d.centered ? d.color : (_var.selection.clicked[d.id] != null || _var.selection.searched[d.id] != null || _var.selection.hover != null && d.id === _var.selection.hover.id ? "#333" : "#fff");
                  _var.context.lineWidth = (d.centered ? 3 : 1) / _var.transform.k;
                  _var.context.stroke();
                };
                _var.getP = function (attr, p) {
                  if (attr === 'x') {
                    return p;
                  }
                  if (attr === 'y') {
                    return p;
                  }
                };
                _var.ticked = function () {
                  _var.context.clearRect(0, 0, _var.width, _var.height);
                  _var.context.save();
                  _var.context.translate(_var.getP('x', _var.transform.x), _var.getP('y', _var.transform.y));
                  _var.context.scale(_var.transform.k, _var.transform.k);
                  _var.context.lineWidth = 1 / _var.transform.k;
                  _var.data.links.forEach(_var.drawLink);
                  _var.data.nodes.forEach(_var.drawNode);
                  return _var.context.restore();
                };

                _var.scales = {
                  size: {},
                  weight: d3.scaleLinear().domain(d3.extent(_var.data.links.map(function (d) {
                    return +d.weight;
                  }))).range([.5, 4])
                };

                // Map groups
                var groups = {};
                var domains = {};
                _var.data.nodes.forEach(function (d) {

                  // Get and set groups
                  d.group = d.group == null ? "No group" : d.group;
                  groups[d.group] = true;

                  // Set domains for group scales
                  if(domains[d.group] == null) { domains[d.group] = [+d.metric, +d.metric]; }
                  if(domains[d.group][0] > +d.metric) { domains[d.group][0] = +d.metric; }
                  if(domains[d.group][1] < +d.metric) { domains[d.group][1] = +d.metric; }

                  // Initialize group scale
                  if(_var.scales.size[d.group] == null) { _var.scales.size[d.group] = d3.scaleLinear().range([4,10]); }

                  // Set colors
                  if(d.color == null) {
                    _var.label.values[d.group] = _var.colors.scale(d.group);
                    d.color = _var.label.values[d.group];
                  }

                  // Has centereds
                  if(d.centered != null && d.centered) {
                    _var.label.centered[d.name] = d.color;
                  }

                });

                // Set scales domains
                Object.keys(_var.scales.size).forEach(function(k) {
                  _var.scales.size[k].domain(domains[k]);
                });

                // Filtered nodes
                _var.centered = { radius: 0, count: 0 };
                _var.data.nodes.forEach(function (d, i) {
                  d.radius = d.centered ? 20 : _var.scales.size[d.group](+d.metric);
                  if(d.centered) {
                    d.center_index = _var.centered.count;
                    _var.centered.radius += d.radius;
                    _var.centered.count += 1;
                  }
                });

                // Initialize simulation force layout
                _var.simulation = d3.forceSimulation()
                  .force("link", d3.forceLink().id(function (d) { return d.id; }))
                  .force("charge", d3.forceManyBody().distanceMax(_var.width * 0.3).strength(function (d) {return -20; }))
                  .force("center", d3.forceCenter(_var.width / 2, _var.height / 2))
                  .force("collision", d3.forceCollide(function(d) { return d.radius*1.1 ; }));

                // Force actions
                _var.simulation.nodes(_var.data.nodes).on("tick", _var.ticked);
                _var.simulation.force("link").links(_var.data.links);

                _var.data.links.forEach(function (d, i) {
                  var rgb, src, tgt, total;
                  d.width = _var.scales.weight(d.weight);
                  total = d.source.metric + d.target.metric;
                  src = d3.rgb(_var.colors.scale(d.source.group));
                  tgt = d3.rgb(_var.colors.scale(d.target.group));
                  rgb = ['r', 'g', 'b'].map(function (k) {
                    return src[k] * (d.source.metric / total) + tgt[k] * (d.target.metric / total);
                  });
                  return d.color = '#ccc';
                });
            }
          })();

      }
    }
    return _var;
  };
  ['_var', 'action', 'animation'].forEach(function (key) {
    validate[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return validate;
    };
    return main[key] = function (_) {
      if (!arguments.length) {
        eval("return " + key);
      }
      eval(key + " = _");
      return main;
    };
  });
  main.run = function (_) {
    return main('run');
  };
  return main;
};
