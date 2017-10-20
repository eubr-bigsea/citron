'use strict';

// Initialize the visualization class

gViz.vis.wordtree.helpers = function () {
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

          // Creates a curved (diagonal) path from parent to the child nodes
          _var.diagonal = function (s, d) {
            var dy = d.depth == 0 ? d.y : d.y + d.bbox.width + _var.offset.y;
            var sy = s.y;
            return 'M ' + sy + ' ' + s.x + ' C ' + (sy + dy) / 2 + ' ' + s.x + ', ' + (sy + dy) / 2 + ' ' + d.x + ', ' + dy + ' ' + d.x;
          };

          // Collapse the node and all it's children
          _var.collapse = function (d) {
            if (d.children) {
              d._children = d.children;
              d._children.forEach(_var.collapse);
              d.children = null;
            }
          };

          // Calculate levels sizes
          _var.getLevelSizes = function (d) {

            // Increase level
            if (_var.levels.sizes[d.depth] == null) {
              _var.levels.sizes[d.depth] = 1;
            } else {
              _var.levels.sizes[d.depth] += 1;
            }

            // Recursive iteration
            if (d.children) {
              d.children.forEach(_var.getLevelSizes);
            }
          };

          // Calculate values
          _var.getValues = function (d) {

            var value = 1;

            // Recursive iteration
            if (d.children) {
              d.children.forEach(function (c) {

                // Recursive iteration
                value += _var.getValues(c);
              });
            }

            // Set value
            d._value = value - 1;

            return value;
          };

          // Calculate levels sizes
          _var.getFontSizes = function (d) {

            // Set font size and bbox
            if (d.fonSize == null) {
              d.fontSize = d.parent == null ? _var.fontScale.range()[1] + 5 : _var.fontScale(d._value);
            }
            if (d.bbox == null) {
              d.bbox = gViz.shared.helpers.text.getBBox(_var.g, d.data.name, d.fontSize, d.children != null || d._children != null ? "bold" : "normal");
            }

            // Reset acc
            d.acc = 0;

            // Recursive iteration
            if (d.children != null) {

              var bbox_array = d.children.map(function (c) { return _var.getFontSizes(c); });
              var width = d.bbox.width + d3.max(bbox_array.map(function (a) { return a._width; }));
              var height = d3.sum(bbox_array.map(function (a) { return a._height; }));

              // Set sizes
              d.bbox._width = d.bbox.width > width ? d.bbox.width + 6 * _var.offset.y : width;
              d.bbox._height = d.bbox.height > height ? d.bbox.height + _var.offset.x : height;

            // Recursive iteration
            } else if (d._children != null) {

              var bbox_array = d._children.map(function (c) { return _var.getFontSizes(c); });
              var width = d.bbox.width + d3.max(bbox_array.map(function (a) { return a._width; }));
              var height = d3.sum(bbox_array.map(function (a) { return a._height; }));

              // Set sizes
              d.bbox._width = d.bbox.width > width ? d.bbox.width + 6 * _var.offset.y : width;
              d.bbox._height = d.bbox.height > height ? d.bbox.height + _var.offset.x : height;

            } else {

              // Set sizes
              d.bbox._width = d.bbox.width + 6 * _var.offset.y;
              d.bbox._height = d.bbox.height + _var.offset.x;
            }

            return d.bbox;
          };

          // Reset sizes based on tree
          _var.resetSizes = function () {

            // Calculate initial font sizes and levels
            _var.getFontSizes(_var.root);

            _var.height = _var.root.bbox._height;
            _var.width = _var.root.bbox._width + _var.margin.left + _var.margin.right + 6 * _var.offset.y;

            // Declares a tree layout and assigns the size
            _var.treemap = d3.tree().size([_var.height, _var.width]);

            // Update outer dimensions
            _var.wrap
              .attr("width", _var.width + _var.margin.left + _var.margin.right)
              .attr("height", _var.height + _var.margin.top + _var.margin.bottom);

            // Set wrappers height
            _var.container.jq.css("height", parseInt(_var.height + _var.margin.top + _var.margin.bottom + 50) + 'px');
          };

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
