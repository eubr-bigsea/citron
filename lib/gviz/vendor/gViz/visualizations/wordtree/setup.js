'use strict';

// Initialize the visualization class

gViz.vis.wordtree.setup = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var duration = 500;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };

  // Main function
  var main = function main(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          //// Collapse after the second level
          //_var.root.children.forEach(_var.collapse);

          // Update function
          _var.update = function (source) {

            // Assigns the x and y position for the nodes
            var treeData = _var.treemap(_var.root);

            // Compute the new tree layout.
            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);

            // Get offsets for widths
            nodes.forEach(function (d) {

              if (d.parent != null) {
                var offset = d.children == null && d._children == null || d.children != null ? d.bbox.height / 2 : _var.offset.x;
                d.x = d.parent.acc + d.bbox._height / 2 - offset;
                d.acc = d.parent.acc;
                d.parent.acc += d.bbox._height;
              }

              d.y = d.offset = d.parent == null ? d.bbox.width + 2 * _var.offset.y : d.parent.y + d.parent.bbox.width + 2 * _var.offset.y;
            });

            // ****************** Nodes section ***************************

            // Update the nodes...
            var node = _var.g.selectAll('g.node').data(nodes, function (d) {
              return d.id || (d.id = ++_var.i);
            });

            // Enter any new modes at the parent's previous position.
            var nodeEnter = node.enter().append('g').attr('class', 'node').attr("transform", function (d) {
              return "translate(" + source.y0 + "," + source.x0 + ")";
            }).on('click', click);

            // Add labels for the nodes
            nodeEnter.append('text').attr("y", function (d) {
              return d.depth === 0 ? d.bbox.height * .24 : d.bbox.height * .25;
            }).attr("x", function (d) {
              return d.depth === 0 ? -d.bbox.width : 5;
            }).attr("text-anchor", "start").style("font-size", function (d) {
              return (d.parent == null ? (d.fontSize - 2) : d.fontSize) + 'px';
            })
            //.style("display", "none")
            .text(function (d) { return d.data.name; });

            // UPDATE
            var nodeUpdate = nodeEnter.merge(node);

            // Transition to the proper position for the node
            nodeUpdate.transition().duration(duration).attr("transform", function (d) {
              return "translate(" + d.y + "," + d.x + ")";
            }).selectAll("text").style("font-weight", function (d) {
              return d.children != null || d._children != null ? "bold" : "normal";
            });

            //// Update the node attributes and style
            //nodeUpdate.select('circle.node')
            //  .attr('r', 2)
            //  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
            //  .attr('cursor', 'pointer');

            // Remove any exiting nodes
            var nodeExit = node.exit().transition().duration(duration).attr("transform", function (d) {
              return "translate(" + source.y + "," + source.x + ")";
            }).remove();

            //// On exit reduce the node circles size to 0
            //nodeExit.select('circle')
            //  .attr('r', 1e-6);

            // On exit reduce the opacity of text labels
            nodeExit.select('text').style('fill-opacity', 1e-6);

            // ****************** links section ***************************

            // Update the links...
            var link = _var.g.selectAll('path.link').data(links, function (d) {
              return d.id;
            });

            // Enter any new links at the parent's previous position.
            var linkEnter = link.enter().insert('path', "g").attr("class", "link").attr('d', function (d) {
              return _var.diagonal({ x: source.x0, y: source.y0, bbox: source.bbox, depth: source.depth }, { x: source.x0, y: source.y0, bbox: source.bbox, depth: source.depth });
            });

            // UPDATE
            var linkUpdate = linkEnter.merge(link);

            // Transition back to the parent element position
            linkUpdate.transition().duration(duration).attr('d', function (d) {
              return _var.diagonal(d, d.parent);
            });

            // Remove any exiting links
            var linkExit = link.exit().transition().duration(duration).attr('d', function (d) {
              return _var.diagonal({ x: source.x, y: source.y, bbox: source.bbox, depth: source.depth }, { x: source.x, y: source.y, bbox: source.bbox, depth: source.depth });
            }).remove();

            // Store the old positions for transition.
            nodes.forEach(function (d) {
              d.x0 = d.x;
              d.y0 = d.y;
            });

            // Toggle children on click.
            function click(d) {

              // Collapse node
              if (d.children) {
                d._children = d.children;
                d.children = null;

                // Expand node
              } else {
                d.children = d._children;
                d._children = null;
              }

              // Reset sizes based on tree
              _var.resetSizes();

              // Update tree
              _var.update(d);
            }
          };

          // Update tree
          _var.update(_var.root);

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'duration'].forEach(function (key) {

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
