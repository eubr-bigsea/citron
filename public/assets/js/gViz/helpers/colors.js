"use strict";

// Create date helper main object

if (!gViz.helpers.colors) {
  gViz.helpers.colors = {};
}

// Initializer main color pallete
gViz.helpers.colors.main = d3.scaleOrdinal(["#b172b2", "#eb65a0", "#bccf02", "#5bb12f", "#73c5e1"]);

gViz.helpers.colors.d310 = d3.scaleOrdinal(d3.schemeCategory10);

// Initializer gray scale color pallete
gViz.helpers.colors.gray = d3.scaleOrdinal(["#000", "#333", "#666", "#999", "#bbb", "#ccc", "#ddd", "#eee"]);

// Initialize Linear Colour Scale. Params dependent
gViz.helpers.colors.linear = function(data, attr, colourRange) {
	return d3.scaleLinear()
				  .domain(d3.extent(data, function(d) {
            return d[attr];
          }))
          .range(colourRange);
}

// Is dark function
gViz.helpers.colors.isDark = function (c) {

  c = c.substring(1);
  // strip #
  var rgb = parseInt(c, 16);
  // convert rrggbb to decimal
  var r = rgb >> 16 & 0xff;
  // extract red
  var g = rgb >> 8 & 0xff;
  // extract green
  var b = rgb >> 0 & 0xff;
  // extract blue
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // per ITU-R BT.709
  return luma < 138;
};
