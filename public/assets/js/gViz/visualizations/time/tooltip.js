'use strict';

// Initialize the visualization class
gViz.vis.time.tooltip = function () {
  "use strict";

  // Get attributes values

  var _var = undefined;
  var action = 'create';
  var animation = 900;
  var element = undefined;
  var el = undefined;

  // Validate attributes
  var validate = function validate(step) {

    switch (step) {
      case 'run':
        return element != null && $(element).length !== 0;
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

          switch (action) {

            case 'create':

              if (!_var.tooltip) {
                _var.tooltip = {};
              }
              _var.tooltip.bisect = d3.bisector(function (d) {
                return d.date;
              }).left;
              _var.tooltip.obj = undefined;
              break;

            case 'bind':

              d3.select(element).on('mouseover', function (d) {

                // Get  element
                el = this;

                // Show tooltip
                action = 'show';
                main('run');
              });

              d3.select(element).on('mousemove', function (d) {

                // Get  element
                el = this;

                // Show tooltip
                action = 'show';
                main('run');
              });

              d3.select(element).on('mouseout', function (d) {

                // Hide tooltip
                action = 'hide';
                main('run');
              });
              break;

            case 'hide':

              // Remove date
              _var.tooltip.obj = undefined;

              // Hide tooltipster
              d3.select('.tooltipster-visualization').style('display', 'none');
              break;

            case 'show':

              // Initialize variables
              var event = void 0,
                  pos = void 0,
                  date = void 0,
                  bisect = void 0,
                  x0 = void 0,
                  x1 = void 0,
                  valid_date = void 0,
                  offset = void 0,
                  padding = void 0;

              // Get mouse event and object position from mouse
              event = d3.event ? d3.event : window.event;
              pos = d3.mouse(element);

              // Get valid date
              date = _var._x.invert(d3.mouse(el)[0]);

              // Get position of label
              bisect = _var.tooltip.bisect(_var.data, date);
              if (bisect > 0 && bisect < _var.data.length - 1) {
                x0 = _var._x(_var.data[bisect - 1].x);
                x1 = _var._x(_var.data[bisect].x);
                bisect = pos[0] - x0 >= (x1 - x0) / 2 ? bisect : bisect - 1;
              }

              // Get valid date
              valid_date = _var.data[bisect];

              if (valid_date != null) {

                // Set new date
                _var.tooltip.obj = valid_date;

                // Set title content
                _var.tooltip.content = '<span class=\'title\'>' + gViz.helpers.date.format.milliseconds.format(date) + '</span>';

                // Set subtitles content
                Object.keys(_var.tooltip.obj.series).forEach(function (key) {
                  return _var.tooltip.content += '<span class=\'subtitle\' style=\'color: ' + _var.colors.scale(key) + ';\'>' + key + ': ' + gViz.helpers.number.locale(_var.tooltip.obj.series[key].value) + '</span>';
                });

                // Set tooltip position and content
                d3.select('.tooltipster-visualization .tooltipster-content').html(_var.tooltip.content);

                // Get offsets
                offset = {
                  top: _var.container.jq.offset().top + _var.margin.top - ($('.tooltipster-visualization').outerHeight() + 10),
                  left: _var.container.jq.offset().left + _var.margin.left + pos[0] - $('.tooltipster-visualization').outerWidth() / 2,
                  arrow: undefined
                };

                // Reset offset left and arrow
                padding = 8;
                if (offset.left + $('.tooltipster-visualization').outerWidth() > $(window).outerWidth() - padding) {

                  // Update arrow and left positions
                  offset.arrow = $('.tooltipster-visualization').outerWidth() - ($(window).outerWidth() - padding - offset.left - $('.tooltipster-visualization').outerWidth() / 2);
                  offset.left = $(window).outerWidth() - padding - $('.tooltipster-visualization').outerWidth();

                  // Set tooltip position and content
                  d3.select('.tooltipster-visualization .tooltipster-arrow').style('left', offset.arrow + 'px');
                } else if (offset.left < padding) {

                  // Update arrow and left positions
                  offset.arrow = $('.tooltipster-visualization').outerWidth() / 2 - (padding + Math.abs(offset.left)) + 3;
                  offset.left = padding;

                  // Set tooltip position and content
                  d3.select('.tooltipster-visualization .tooltipster-arrow').style('left', offset.arrow + 'px');
                } else {

                  // Set tooltip position and content
                  d3.select('.tooltipster-visualization .tooltipster-arrow').style('left', "50%");
                }

                // Set tooltip position and content
                d3.select('.tooltipster-visualization').style('top', offset.top + 'px').style('left', offset.left + 'px').style('display', 'block');
              } else {
                main('hide');
              }
              break;
          }
          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var', 'action', 'animation', 'element'].forEach(function (key) {

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
