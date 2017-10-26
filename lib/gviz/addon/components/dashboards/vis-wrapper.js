/* global gViz */
import { empty } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-dashboard-wrapper","grid-stack-item"],
  attributeBindings: ['x:data-gs-x','y:data-gs-y','width:data-gs-width','height:data-gs-height','dataVizId:data-viz-id','dataJobId:data-viz-job-id','dataTaskId:data-viz-task-id'],
  x: computed('viz.x', function() {
    return this.get('viz').x == null || isNaN(+this.get('viz').x) ? 0 : +this.get('viz').x;
  }),
  y: computed('viz.y', function() {
    return this.get('viz').y == null || isNaN(+this.get('viz').y) ? 0 : +this.get('viz').y;
  }),
  width: computed('viz.width', function() {
    return this.get('viz').width == null || isNaN(+this.get('viz').width) ? 4 : +this.get('viz').width;
  }),
  height: computed('viz.height', function() {
    return this.get('viz').height == null || isNaN(+this.get('viz').height) ? 3 : +this.get('viz').height;
  }),
  dataVizId: computed('viz.id', function() {
    return this.get('viz.id');
  }),
  dataTaskId: computed('viz.task_id', function() {
    return this.get('viz.task_id');
  }),
  dataJobId: computed('viz.job_id', function() {
    return this.get('viz.job_id');
  }),

  // Initialize data
  data: null,
  isEmpty: empty('data'),

  hasCustomMoveHandle: computed('viz.component', function() {
    return this.get('viz.component') === 'visualizations/map-chart';
  }),

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
