// Initialize the visualization class
gViz.vis.time.elements = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  let animation = 900;

  // Validate attributes
  let validate = function(step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  let main = function(step) {

    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          // Initialize variables
          let ids, data = [], bounds, elements, groups, els, bg_rect, bg_rect_str, start = undefined, end = undefined;

          // Area constructor
          if (_var.shape === 'area') {

            _var.constructor = d3.area()
              .x(d => _var._x(d.x))
              .y0(_var.height)
              .y1(d => _var.y(d.y));

          // Line constructor
          } else {

            _var.constructor = d3.line()
              .x(d => _var._x(d.x))
              .y(d => _var.y(d.y))
              .curve(d3.curveStepAfter);
          }

          // Get line names
          ids  = Object.keys(_var.data[0].series);

          // Get data bounds
          bounds = _var._x.domain();

          // Filter data
          _var.data.forEach( (d,i) => {
            if(d._epoch < bounds[0] && d._epoch < bounds[1]) { start = $.extend({}, d); }
            else if (d._epoch > bounds[0] && d._epoch > bounds[1]) { end = $.extend({}, _var.data[i-1]); }
            else data.push(d);
          });

          // Fix bounds from start and end points
          if(start != undefined && data[0] != start) {
            start._epoch = bounds[0];
            start.date   = new Date(bounds[0]);
            data.unshift(start);
          }
          if(end != undefined && data[data.length-1] != end) {
            end._epoch = bounds[1];
            end.date   = new Date(bounds[1]);
            data.push(end);
          }

          // Map data
          _var.stacked = ids.map(id => ({
            id: id,
            name: data[0].series[id].name,
            group: data[0].series[id].group,
            sorted: d3.median(data.map(d => d.series[id].value)),
            values: data.map(d => ({ date: d.date, x: d._epoch, y: d.series[id].value }))
            //zeros: data.map(d => ({ date: d.date,  x: d._epoch, y: 0 }))
          })).sort((a,b) => d3.descending(a.sorted, b.sorted));

          // Element canvas
          elements = _var.g.selectAll(".chart-elements").data(["chart-elements"]);
          elements.exit().remove();
          elements = elements.enter().append("g").attr("class","chart-elements").merge(elements);

          // Create line/area groups
          groups = elements.selectAll(".element-group").data(_var.stacked, function(d) { return d.id; })
          groups.exit().remove();
          groups = groups.enter().append("g").attr("class", "element-group").merge(groups);

          // For each element in group
          groups.each(function(e, i) {

            // Update line/area groups
            els = d3.select(this).selectAll(`.${_var.shape}.element`).data([e], d => d.id);
            els.exit().remove();
            els = els.enter().append("path").attr("class", `${_var.shape} element`).attr("d", d => _var.constructor(d.values)).merge(els);
            els
              .style('stroke', d => _var.colors.scale(d.id))
              .style('fill', d => { if (_var.shape === 'area') { return _var.colors.scale(d.id); } else { return 'none'; } })
              .attr("d", d => _var.constructor(d.values));

          });

          // Draw Background rect
          bg_rect = _var.g.selectAll("rect.bg-rect").data(["bg-rect"]);
          bg_rect.exit().remove();
          bg_rect = bg_rect.enter().insert('rect',':first-child').attr("class", "bg-rect").merge(bg_rect);
          bg_rect.attr("x", 0).attr('y',0).attr('width', _var.width).attr("height", _var.height);

          // Draw Stroke Background rect
          bg_rect_str = elements.selectAll("rect.bg-rect-stroke").data(["bg-rect-stroke"]);
          bg_rect_str.exit().remove();
          bg_rect_str = bg_rect_str.enter().insert('rect',':first-child').attr("class", "bg-rect-stroke").merge(bg_rect_str);
          bg_rect_str.attr("x", 0).attr('y',0).attr('width', _var.width).attr("height", _var.height);

          break;
      }
    }


    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','animation'].forEach(function(key) {

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
