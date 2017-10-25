// Initialize the visualization class
gViz.vis.scatterPlot.events = function () {
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
          var groups = _var.gE.selectAll(".chart-elements").selectAll(".element-group");
          var circles = _var.gE.selectAll(".chart-elements").selectAll(".element-group").selectAll('circle');

          switch (action) {

            case 'mouseover':

              // Fade other groups
              groups.transition().style('opacity', function(g) {
                return g === node || (_var.clicked != null && (_var.clicked.id === g.id || _var.clicked.parentId === g.parentId)) ? 1 : 0.2;
              })

              // Add filter to hovered node
              circles.transition()
                .style("filter", function(g) { return g === node ? "url(#"+_var.shadowId+")" : ""; })
                .style('fill', function(g) {
                  return g === node || node.parentId === g.parentId || (_var.clicked != null && (_var.clicked.id === g.id || _var.clicked.parentId === g.parentId)) ? g.color : (g.fadeColor != null ? g.fadeColor : g.color);
                })

              // Get x and y values
              var x = _var.x(node.parsedX) + (_var.xIsDate || _var.xIsNumber ? 0 : _var.x.bandwidth()/2);
              var y = _var.y(+node.y);
              var z = _var.z(+node.z);

              // Get left and top positions
              var left = _var.wrap.node().getBoundingClientRect().left +_var.margin.left + x;
              var top  = _var.wrap.node().getBoundingClientRect().top + _var.margin.top + y - z;

              // Initialize tooltip object
              var tooltipObj = {};

              // Set node attributes to tooltip obj
              Object.keys(node).forEach(function(k) { tooltipObj[k] = node[k]; });

              // Set x, y and z values with format
              tooltipObj.x = _var.xFormat(+node.x);
              tooltipObj.y = _var.yFormat(+node.y);
              tooltipObj.z = _var.zFormat(+node.z);

              // Set tooltip component
              gViz.shared.visualComponents.tooltip()
                ._var(_var)
                .body(_var.data.tooltip != null && _var.data.tooltip.body != null ? _var.data.tooltip.body : "")
                .borderColor(node.color)
                .hasImg(_var.data.tooltip != null && _var.data.tooltip.hasImg === true)
                .left(left)
                .muted(_var.data.tooltip != null && _var.data.tooltip.muted != null && _var.data.tooltip.muted === true)
                .obj(tooltipObj)
                .top(top)
                .title(_var.data.tooltip != null && _var.data.tooltip.title != null ? _var.data.tooltip.title : "")
                .run();

              // Set axis guide
              gViz.shared.visualComponents.axisGuide()
                ._var(_var)
                .color(node.color)
                .height(_var.height)
                .left(left)
                .top(top)
                .value({ x: _var.xFormat(node.x), y: _var.yFormat(+node.y)})
                .x(x)
                .y(y)
                .z(z)
                .run();

              break;

            case 'mouseout':

              // Reset other groups opacity
              groups.transition().style('opacity', function(d) {
                return _var.clicked == null || _var.clicked.id === d.id || _var.clicked.parentId === d.parentId ? 1 : 0.2;
              })
              // Remove filter
              circles.transition()
                .style("filter", "")
                .style('fill', function(d) {
                  return _var.clicked != null && (_var.clicked.id === d.id || _var.clicked.parentId === d.parentId) ? d.color : (d.fadeColor != null ? d.fadeColor : d.color);
                })

              // Put smaller elements on the front
              groups.sort(function(a,b) { return d3.descending(+a.z, +b.z); })

              // Set bars component
              gViz.shared.visualComponents.tooltip()
                ._var(_var)
                .action("hide")
                .run();

              // Set bars component
              gViz.shared.visualComponents.axisGuide()
                ._var(_var)
                .action("hide")
                .run();

              break;

            case 'click':

              // Fade other groups
              groups.transition().style('opacity', function(g) {
                return g === node || (_var.clicked != null && (_var.clicked.id === g.id || _var.clicked.parentId === g.parentId)) ? 1 : 0.2;
              })

              circles.transition().style('fill', function(g) {
                return g === node || (_var.clicked != null && (_var.clicked.id === g.id || _var.clicked.parentId === g.parentId)) ? g.color : (g.fadeColor != null ? g.fadeColor : g.color);
              })

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
