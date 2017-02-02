'use strict';

gViz.vis.graph.tooltip = function () {
  "use strict";

  var _var, action, animation, collection, el, main, node, obj, opacity, validate;
  _var = void 0;
  action = 'create';
  animation = 900;
  collection = void 0;
  el = void 0;
  node = {};
  obj = void 0;
  opacity = 1;
  validate = function validate(step) {
    switch (step) {
      case 'run':
        return true;
      default:
        return false;
    }
  };
  main = function main(step) {
    var bbox, offset, padding;
    if (validate(step)) {
      switch (step) {
        case 'run':
          switch (action) {
            case 'create':
              _var.tooltip || (_var.tooltip = {});
              _var.tooltip.node = void 0;
              break;
            case 'hide':
              _var.tooltip.node = void 0;
              d3.select('.tooltipster-visualization').style('display', "none").style('opacity', 1);
              break;
            case 'show':
              if (!_var.selection.dragging) {
                bbox = {
                  left: _var.container.jq.offset().left + node.x * _var.transform.k + _var.transform.x,
                  top: _var.container.jq.offset().top + node.y * _var.transform.k + _var.transform.y,
                  width: node.group === 'documents' ? 15 : 15
                };
                _var.tooltip.content = "<span class='title'>" + (node.attrs.id == null ? node.id : node.attrs.id) + "</span>";
                //_var.tooltip.content += "<span class='subtitle'>Name: <b>" + (node.attrs.name == null ? node.name : node.attrs.name) + "</b>";
                //_var.tooltip.content += "<br> Group: <b>" + (node.attrs.group == null ? node.group : node.attrs.group) + "</b>";
                _var.tooltip.content += "</span>";
                d3.select('.tooltipster-visualization .tooltipster-content').html(_var.tooltip.content);
                offset = {
                  top: bbox.top - 2 * node.radius / _var.transform.k - $('.tooltipster-visualization').outerHeight() / 2,
                  left: bbox.left + bbox.width - $('.tooltipster-visualization').outerWidth() / 2,
                  arrow: void 0
                };
                padding = 8;
                if (offset.left + $('.tooltipster-visualization').outerWidth() > $(window).outerWidth() - padding) {
                  offset.arrow = $('.tooltipster-visualization').outerWidth() - ($(window).outerWidth() - padding - offset.left - $('.tooltipster-visualization').outerWidth() / 2);
                  offset.left = $(window).outerWidth() - padding - $('.tooltipster-visualization').outerWidth();
                  d3.select('.tooltipster-visualization .tooltipster-arrow').style('left', offset.arrow + "px");
                } else if (offset.left < padding) {
                  offset.arrow = $('.tooltipster-visualization').outerWidth() / 2 - (padding + Math.abs(offset.left));
                  offset.left = padding;
                  d3.select('.tooltipster-visualization .tooltipster-arrow').style('left', offset.arrow + "px");
                } else {
                  d3.select('.tooltipster-visualization .tooltipster-arrow').style('left', "50%");
                }
                d3.select('.tooltipster-visualization').style('top', offset.top + "px").style('left', offset.left + "px").style('display', 'block');
              }
          }
      }
    }
    return _var;
  };
  ['_var', 'action', 'animation', 'collection', 'el', 'node', 'obj', 'opacity'].forEach(function (key) {
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
