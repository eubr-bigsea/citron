import Ember from 'ember';

export default Ember.Component.extend({
  // Set html elements
  tagName: "div",
  classNames: ["gViz-outer-wrapper"],

  // Initialize data
  data: null,
  isEmpty: Ember.computed.empty('data'),

  // Initialize data
  didInsertElement() {

    // Update data function
    this.get('updateData')(this);
  },

  // Update data function
  updateData: function(self) {

    // Get data from API
    $.ajax({
      url: self.get('dataUrl'),
      type: "GET",
      beforeSend() { gViz.shared.helpers.loading.show(); },
      contentType: "application/json",
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
