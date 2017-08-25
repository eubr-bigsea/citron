// Initialize the visualization class
gViz.shared.visualComponents.tooltip = function() {
  "use strict";

  // Get attributes values
  var _var        = undefined;
  var action      = "show";
  var body        = "#333";
  var borderColor = "#333";
  var color       = "#333";
  var content     = "";
  var hasImg      = false;
  var left        = 0;
  var muted       = false;
  var obj         = {};
  var top         = 0;
  var title       = 0;

  // Validate attributes
  var validate = function(step) {
    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Get window position
          var doc = document.documentElement;
          var offset = {
            left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            top:  (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
          };

          switch (action) {

            // Show tooltip
            case 'show':
            case 'updateLocation':

              // If is muted
              if(muted) { obj.color = "#666"; color = "#666"; borderColor = "#666"; }

              // Set title content
              title = title == null || title.constructor !== Array ? [] : title;
              title = title.map(function(t, i) {

                // Set image
                if(i === 0 && hasImg === true && obj.img != null && obj.img !== "") {

                  t = "<span class='title with-image' style='color: #666; background-color: #FFF; "+( i !== 0 ? 'border-top: 1px solid {{color}}' : '')+"'><span class='title-img' style='border-right: 1px solid {{color}}'><img src='{{img}}'/></span><span class='title-text'>"+t+"</span></span>";
                  //t = "<span class='title with-image' style='color: {{color}}; background-color: " + (gViz.shared.helpers.colors.isDark(obj.color) ? "#FFF" : "#434343") + "; "+( i !== 0 ? 'border-top: 1px solid {{color}}' : '')+"'><span class='title-img' style='border-right: 1px solid {{color}}'><img src='{{img}}'/></span><span class='title-text'>"+t+"</span></span>";

                } else {

                  t = "<span class='title' style='color: #666; background-color: #FFF; "+( i !== 0 ? 'border-top: 1px solid {{color}}' : '')+"'>" + t + "</span>";
                  //t = "<span class='title' style='color: {{color}}; background-color: " + (gViz.shared.helpers.colors.isDark(obj.color) ? "#FFF" : "#434343") + "; "+( i !== 0 ? 'border-top: 1px solid {{color}}' : '')+"'>" + t + "</span>";

                }

                return t;
              }).join('');

              // Set body content
              body = body == null || body.constructor !== Array ? [] : body;
              body = body.map(function(d) { return "<span class='text' style='background-color: {{color}}; color: " + (gViz.shared.helpers.colors.isDark(obj.color) ? "#FFF" : "#434343") + ";'>" + d + "</span>"; }).join('');

              // Join content
              content = gViz.shared.helpers.text.replaceVariables(title, obj) + gViz.shared.helpers.text.replaceVariables(body, obj);

              // Update tooltip content
              var tooltip = d3.selectAll('.gViz-tooltip').data(["gViz-tooltip"]);
              tooltip.exit().remove();
              tooltip = tooltip.enter().append("div").attr("class", 'gViz-tooltip').style('opacity', 0).merge(tooltip);
              tooltip
                .each(function() {

                  // Update tooltip content
                  var ctn = d3.select(this).selectAll('.content').data(["gViz-content"]);
                  ctn.exit().remove();
                  ctn = ctn.enter().append("div").attr("class", 'content').merge(ctn);
                  ctn
                    .style("border", "1px solid "+borderColor)
                    .html(content)

                  // Update tooltip content
                  var arrow = d3.select(this).selectAll('.arrow').data(["gViz-arrow"]);
                  arrow.exit().remove();
                  arrow = arrow.enter().append("div").attr("class", 'arrow ' + (body === '' ? 'no-body' : '')).merge(arrow);
                  arrow
                    .style("color", borderColor)
                    .html("<span style= 'color:" + (body === '' ? (gViz.shared.helpers.colors.isDark(obj.color) ? "#FFF" : "#434343") : '') + ";'>▼</span><span class='arrow-bg'>▼</span>");

                });

                // Update tooltip position
                tooltip.transition().delay(10)
                  .on("end", function() {
                    d3.select(this)
                      .style("left", function() { return (offset.left + left - this.getBoundingClientRect().width/2) + "px"; })
                      .style("top", function() { return (offset.top + top - (2 + this.getBoundingClientRect().height)) + "px"; })
                      .transition().duration(50)
                        .style("display", action === 'show' ? '' : 'block')
                        .style("opacity", 1);
                  })

              break;

            // Hide only
            case 'hideSoft':

              // Hide only
              d3.selectAll('.gViz-tooltip').transition().delay(250).duration(10)
                .style("opacity", 0)
                .style('display', 'none');

              break;

            // Hide and remove tooltip
            case 'hide':

              // Hide & Remove
              var tooltip = d3.selectAll('.gViz-tooltip').data(["gViz-tooltip"]);
              tooltip.exit().remove();
              tooltip = tooltip.enter().append("div").attr("class", 'gViz-tooltip').merge(tooltip);
              tooltip.style("opacity", 0).remove()

              break;

          }
          break;
      }
    }
  };

  // Exposicao de variaveis globais
  ['_var','action','body','borderColor','color','hasImg','left','muted','obj','top','title'].forEach(function(key) {

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

  // Executa a funcao chamando o parametro de step
  main.run = _ => main('run');

  return main;
};
