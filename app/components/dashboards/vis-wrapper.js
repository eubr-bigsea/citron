import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-dashboard-wrapper","grid-stack-item"],
  attributeBindings: ['x:data-gs-x','y:data-gs-y','width:data-gs-width','height:data-gs-height'],
  x: 0,
  y: 0,
  width: 4,
  height: 2,

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

    // Add resize binding
    var tm = new Date();
    self.$().on('resize', function() {

      // Clear timeout
      clearTimeout(tm);

      // Initialize timout
      tm = setTimeout(function() {
        self.incrementProperty('resizeIndex');
      }, 300);

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
