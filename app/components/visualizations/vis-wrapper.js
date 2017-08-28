import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-outer-wrapper"],

  // Initialize data
  data: null,
  isEmpty: Ember.computed.empty('data'),
  resizeIndex: 0,

  // Initialize data
  didInsertElement() {

    // Store this
    var self = this;

    // Update data function
    self.get('updateData')(self);

    // Bind resize
    self.$().resizable({
      start: function() {
        self.$().removeClass('hovering').addClass('hovering').css('opacity', 0.6);
      },
      stop: function() {
        self.incrementProperty('resizeIndex');
        self.$().removeClass('hovering').css('opacity', 1);
      },
      containment: self.$().parent(),
      minWidth: 300,
      minHeight: 300
    });

  },

  // Update data function
  updateData: function(self) {

    // Get data from API
    $.ajax({
      url: self.get('dataUrl'),
      type: "GET",
      beforeSend() { gViz.shared.helpers.loading.show(); },
      success(json) {

        self.set('data', json);

      },

      // Hide loading div and render error
      error() { gViz.shared.helpers.loading.hide(); console.error("Error"); },

      // Hide loading div and render complete
      complete() { gViz.shared.helpers.loading.hide(); }

    });

  }

});
