'use strict';

// Create loading helper main object

if (!gViz.helpers.loading) {
  gViz.helpers.loading = {};
}
if (!gViz.helpers.loading.queue) {
  gViz.helpers.loading.queue = [];
}

// Mostra loading div
gViz.helpers.loading.show = function () {

  // Add request to queue
  gViz.helpers.loading.queue.push(1);

  // Show loading div
  $(".loading-div").css('display', 'block').find(".loading-div-inner").css('height', $(window).outerHeight()).css('width', $(window).outerWidth());
  $("body").removeClass("no-scroll").addClass("no-scroll");

  return;
};

// Some com loading div
gViz.helpers.loading.hide = function () {

  // Remove request from queue
  gViz.helpers.loading.queue.pop();

  // Hide loading div only if the queue has finished
  if (gViz.helpers.loading.queue.length === 0) {
    $(".loading-div").css('display', 'none');
    $("body").removeClass("no-scroll");
  }

  return;
};
