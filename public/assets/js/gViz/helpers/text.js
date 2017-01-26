// Create date helper main object
if (!gViz.helpers.text) { gViz.helpers.text = {}; }

// Get string width
gViz.helpers.text.getBBox = function(container, text="bla", fontSize=12) {
  let o = container.append("text").style("font-size", `${fontSize}px`).style("visibility", "hidden !important").text(text);
  let bbox = o.node().getBBox();
  o.remove();
  return bbox;
}
