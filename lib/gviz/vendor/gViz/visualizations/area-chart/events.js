// Initialize the visualization class
gViz.vis.areaChart.events = function () {
  "use strict";

  // Get attributes values
  var _var       = null;
  var action     = 'mouseover';
  var components = null;
  var node       = null;

  // Validate attributes
  var validate = function (step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function (step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Run code
        case 'run':

          // Set groups
          var groups = _var.g.selectAll(".chart-elements").selectAll(".element-group");
          var points = _var.g.selectAll(".chart-elements").selectAll(".element-group").selectAll('.point');
          var lines  = _var.g.selectAll(".chart-elements").selectAll(".element-group").selectAll('.line');

          switch (action) {

            case 'mouseover':

              // Fade other groups
              groups.transition()
                .style('opacity', function(g) { return g === node || g.id === node._parent.id ? 1 : 0.2; })

              // Add style to lines
              lines.transition()
                .style("filter", function(g) { return g === node || g.id === node._parent.id ? "url(#"+_var.shadowId+")" : ""; })
                .style('opacity', function(g) { return g === node || g.id === node._parent.id ? 1 : 0.2; })

              // Add style to points
              points.transition()
                .style("filter", function(g) { return g === node ? "url(#"+_var.shadowId+")" : ""; })
                .style('opacity', function(g) { return g.parsedX === node.parsedX || g === node || g._parent.id === node._parent.id ? 1 : 0.2; })

              // Get x and y values
              var x = _var.x(node.parsedX) + (_var.xIsDate || _var.xIsNumber ? 0 : _var.x.bandwidth()/2)
              var y = _var.y(+node.y);
              var z = _var.pointSize(node);

              // Get left and top positions
              var left = _var.wrap.node().getBoundingClientRect().left +_var.margin.left + x;
              var top  = _var.wrap.node().getBoundingClientRect().top + _var.margin.top + y - z;

              // Initialize tooltip obj function
              var _getTooltipObj = function(n) {

                // Initialize tooltip object
                var tooltipObj = {};

                // Set parent n attributes to tooltip obj
                Object.keys(n._parent).forEach(function(k) { tooltipObj[k] = n._parent[k]; });

                // Set n attributes to tooltip obj
                Object.keys(n).forEach(function(k) { tooltipObj[k] = n[k]; });

                // Set x, y and z values with format
                tooltipObj.x = _var.xFormat(n.x);
                tooltipObj.y = _var.yFormat(n.y);
                tooltipObj.color = _var.pointColor(n);

                return tooltipObj;
              }

              // Store propagate attr
              _var.data.tooltip["_"+_var.data.tooltip.propagate] = _var.data.tooltip[_var.data.tooltip.propagate];

              // Check for Propagate attr
              if(_var.data.tooltip != null && _var.data.tooltip.propagate != null && _var.data.tooltip[_var.data.tooltip.propagate] != null) {

                // Store propagate attr
                _var.data.tooltip[_var.data.tooltip.propagate] = [];

                // Propagate tooltip over all series
                _var.data.data.forEach(function(d) {
                  d.values.filter(function(v) { return v.parsedX === node.parsedX; }).forEach(function(v) {
                    _var.data.tooltip["_"+_var.data.tooltip.propagate].forEach(function(p) {
                      _var.data.tooltip[_var.data.tooltip.propagate].push(gViz.shared.helpers.text.replaceVariables(p, _getTooltipObj(v)));
                    });
                  });
                });
              }

              // Set tooltip object
              var tooltipObj = _getTooltipObj(node);

              // Set tooltip component
              gViz.shared.visualComponents.tooltip()
                ._var(_var)
                .body(_var.data.tooltip != null && _var.data.tooltip.body != null ? _var.data.tooltip.body : "")
                .borderColor(tooltipObj.color)
                .hasImg(_var.data.tooltip != null && _var.data.tooltip.hasImg === true)
                .left(left)
                .muted(_var.data.tooltip != null && _var.data.tooltip.muted != null && _var.data.tooltip.muted === true)
                .obj(tooltipObj)
                .top(top)
                .title(_var.data.tooltip != null && _var.data.tooltip.title != null ? _var.data.tooltip.title : "")
                .run();

              // Reset propagate attr
              _var.data.tooltip[_var.data.tooltip.propagate] = _var.data.tooltip["_"+_var.data.tooltip.propagate];

              break;

            case 'mouseout':

              // Fade other groups
              groups.transition().style('opacity', 1)

              // Add style to lines
              lines.transition()
                .style("filter", "")
                .style('opacity', 1);

              // Add style to points
              points.transition()
                .style("filter", '')
                .style('opacity', 1);

              // Set bars component
              gViz.shared.visualComponents.tooltip()
                ._var(_var)
                .action("hide")
                .run();

              break;

          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','action','components','node'].forEach(function (key) {

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

  // Executa a funcao chamando o parametro de step
  main.run = function (_) {
    return main('run');
  };

  return main;
};
