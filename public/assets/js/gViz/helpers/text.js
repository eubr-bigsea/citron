"use strict";

// Create date helper main object
if (!gViz.helpers.text) {
  gViz.helpers.text = {};
}

// Get string width
gViz.helpers.text.getBBox = function (container) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "bla";
  var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;
  var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'normal';

  var o = container.append("text").style("font-weight", weight).style("font-size", fontSize + "px").style("visibility", "hidden !important").text(text);
  var bbox = o.node().getBBox();
  o.remove();
  return bbox;
};
