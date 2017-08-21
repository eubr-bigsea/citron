// Module declaration
gViz.shared.visualComponents.shadow = function () {
  "use strict";

  // Get attributes values
  var _var         = null;
  var id           = `vis-shadow-${Math.floor(Math.random() * ((1000000000 - 5) + 1)) + 5}`;
  var filterUnits  = "userSpaceOnUse";
  var height       = "250%";
  var width        = "250%";
  var offsetHeight = "-100%";
  var offsetWidth  = "-100%";
  var stdDeviation = 2;
  var x            = -2;
  var y            = 2;
  var wrap         = null;

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

          // Create/Update defs
          var defs = wrap.selectAll("defs.shadow-defs").data(["shadow-defs"]);
          defs.exit().remove();
          defs = defs.enter().insert('defs',':first-child').attr("class", "shadow-defs").merge(defs);
          defs.each(function() {

            // Create filter with id #drop-shadow
            // height=130% so that the shadow is not clipped
            var filter = d3.select(this).selectAll(".shadow-filter").data(["shadow-filter"]);
            filter.exit().remove();
            filter = filter.enter().append('filter').attr("class", "shadow-filter").merge(filter);
            filter
              .attr("id", id)
              .attr('filterUnits', filterUnits)
              .attr("height", height)
              .attr("width", width)
              .attr("x", offsetHeight)
              .attr("y", offsetWidth)
              .each(function() {

                // SourceAlpha refers to opacity of graphic that this filter will be applied to
                // convolve that with a Gaussian with standard deviation 3 and store result
                // in blur
                var feGaussianBlur = d3.select(this).selectAll(".shadow-feGaussianBlur").data(["shadow-feGaussianBlur"]);
                feGaussianBlur.exit().remove();
                feGaussianBlur = feGaussianBlur.enter().append('feGaussianBlur').attr("class", "shadow-feGaussianBlur").merge(feGaussianBlur);
                feGaussianBlur
                  .attr("in", "SourceGraphic")
                  .attr("stdDeviation", stdDeviation)
                  .attr("result", "blur-out");

                // Source matrix
                var feColorMatrix = d3.select(this).selectAll(".shadow-feColorMatrix").data(["shadow-feColorMatrix"]);
                feColorMatrix.exit().remove();
                feColorMatrix = feColorMatrix.enter().append('feColorMatrix').attr("class", "shadow-feColorMatrix").merge(feColorMatrix);
                feColorMatrix
                  .attr("result", "bluralpha")
                  .attr("type", "matrix")
                  .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0 ")

                // Translate output of Gaussian blur to the right and downwards with 2px
                // store result in offsetBlur
                var feOffset = d3.select(this).selectAll(".shadow-feOffset").data(["shadow-feOffset"]);
                feOffset.exit().remove();
                feOffset = feOffset.enter().append('feOffset').attr("class", "shadow-feOffset").merge(feOffset);
                feOffset
                //  .attr("in", "blurAlpha")
                  .attr("dx", x)
                  .attr("dy", y)
                  .attr("result", "the-shadow");

                // Translate output of Gaussian blur to the right and downwards with 2px
                // store result in offsetBlur
                var feBlend = d3.select(this).selectAll(".shadow-feBlend").data(["shadow-feBlend"]);
                feBlend.exit().remove();
                feBlend = feBlend.enter().append('feBlend').attr("class", "shadow-feBlend").merge(feBlend);
                feBlend
                  .attr('in', 'SourceGraphic')
                  .attr('in2', 'the-shadow')
                  .attr('mode', 'normal');

              });
          });

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','id','filterUnits','height','width','stdDeviation','x','y','wrap'].forEach(function (key) {

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

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) { range.push(i); }
  return range;
}
