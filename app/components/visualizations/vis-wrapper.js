import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
  },

  // Set html elements
  tagName: "div",
  classNames: ["gViz-outer-wrapper"],

  // Initialize data
  data: null,
  style: Ember.computed('height', function() { return "600px"; }),

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
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      success(json) {

        // Update data
        self.set('data', json);

      },

      // Hide loading div and render error
      error() { gViz.helpers.loading.hide(); console.log("Error"); },

      // Hide loading div and render complete
      complete() { gViz.helpers.loading.hide(); }

    });

  }

});
