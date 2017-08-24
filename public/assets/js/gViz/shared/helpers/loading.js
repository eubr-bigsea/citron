var queue = [];

// Module declaration
gViz.shared.helpers.loading = {

  // Mostra loading div
  show: function() {

    // Add 1 to loading queue
    queue.push(1);

    // Show loading div
    d3.selectAll(".loading-div")
      .style('display','block')
      .selectAll(".loading-div-inner")
      .style('height', $(window).outerHeight())
      .style('width', $(window).outerWidth());

    // Remove scroll
    d3.select("body").classed("no-scroll", true);
  },

  // Some com loading div
  hide: function() {

    // Remove request from queue
    queue.pop();

    // Hide loading div only if the queue has finished
    if (queue.length === 0) {
      $(".loading-div").css('display', 'none');
      $("body").removeClass("no-scroll");
    }
  }

}
