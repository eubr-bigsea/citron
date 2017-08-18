var queue = [];

// Module declaration
gViz.shared.helpers.loading = {

  // Mostra loading div
  show: function() {

    queue.push(1);

    // Show loading div
    // $(".loading-div").css('display', 'block').find(".loading-div-inner").css('height', $(window).outerHeight()).css('width', $(window).outerWidth());
    // $("body").removeClass("no-scroll").addClass("no-scroll");

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
