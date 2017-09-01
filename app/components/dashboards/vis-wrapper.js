import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-dashboard-wrapper","grid-stack-item"],
  attributeBindings: ['x:data-gs-x','y:data-gs-y','width:data-gs-width','height:data-gs-height','dataVizId:data-viz-id'],
  x: 0,
  y: 0,
  width: 4,
  height: 2,
  dataVizId: Ember.computed('viz', function() {
    return this.get('viz.id');
  }),

  // Initialize data
  data: null,
  isEmpty: Ember.computed.empty('data'),

  // Initialize data
  didInsertElement() {

    // Store this
    var self = this;

    // Set resizeIndex
    self.set('viz.resizeIndex', 0);

    // Update data function
    self.get('updateData')(self);

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
