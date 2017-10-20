// Module declaration
gViz.shared.helpers.text = {

  // Replace text variables
  replaceVariables: function(string, obj) {
    return string.toString().split('{{').map(function(d) {
      if(d.indexOf("}}") !== -1) {
        var pieces = d.split('}}');
        var text = eval('obj.' + pieces[0])
        d = (text == null ? "" : text) + pieces[1];
      }
      return d;
    }).join('');
  },

  // Remove special characters (id for gradients)
  removeSpecial: function(text) {
    return text == null ? '' : text.toString().replace(/[^\w]/gi, '-');
  },

  // Get size of text
  getSize: function(text) {
    var t = d3.select('body').append('span')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('white-space', 'nowrap')
      .html(text);
    var width = t.node().getBoundingClientRect().width;
    t.remove();
    return width + 10;
  },

  // Wrap function into width
  wrap: function(text, width) {
    text.each(function() {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = isNaN(+text.attr("dy")) ? 0 : +text.attr("dy"),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineHeight + "em").text(word);
        }
      }
    });
  },

  // Wrap function into width
  wrapBySize: function(text, width, height) {
    text.each(function() {
      var text = d3.select(this),
        words = text.text().split('').reverse(),
        word,
        line = [],
        line2 = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = isNaN(+text.attr("x")) ? 0 : +text.attr("x"),
        y = isNaN(+text.attr("y")) ? 0 : +text.attr("y"),
        dy = isNaN(+text.attr("dy")) ? 0 : +text.attr("dy"),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      var bbox = null;
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(""));
        bbox = text.node().getBBox();
        if (bbox.width > width) {
          line.pop();
          tspan.text(line.join(""));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
        if(bbox.height > height) { words = []; }
      }
    });
  },

  // Get format for axis
  parseFormat: function(axis) {

    // Get format
    var fmt = function(d) { return d; };

    // Get axis format with prefix and sufix
    if(axis != null) {

      // Set prefix and sufix
      var prefix = axis.prefix != null ? axis.prefix : "";
      var sufix  = axis.sufix != null ? axis.sufix : "";

    } else {
      var prefix = "", sufix = "";
    }

    // Return format parsed
    return function(d) {
      return prefix + fmt(d) + sufix;
    };

  }

};
