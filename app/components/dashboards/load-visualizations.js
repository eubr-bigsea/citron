import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-dashboard-canvas"],

  // Initialize data
  isEmpty: Ember.computed.empty('visualizations'),
  visualizations: Ember.computed('model', function() {

      // Iterate over visualizations to update parameters
      this.get('model.visualizations').forEach(v => {

        // Set data url
        v.dataUrl = [
          config.caipirinha,
          "visualizations",
          v.job_id,
          v.task_id
        ].join('/');

        // Set component name for data visualization
        v.component = ['visualizations',v.type.name].join('/').replace('bar-chart', 'vertical-bar-chart');

        // Set initial style and layouts

      });

      return this.get('model.visualizations');

  }),

  // After insert elements
  didInsertElement() {

    // Store this
    var self = this;

    // Initialize gridstack
    var gs = self.$('.grid-stack').gridstack({
      alwaysShowResizeHandle: true
    });

    // On resize start
    gs.on('resizestart', function(event, ui) {

      // Get grid and element
      var grid = this;
      var element = event.target;

      // Set styles
      self.$(element).removeClass('hovering').addClass('hovering').css('opacity', 0.6);

    });

    // On resize stop
    gs.on('gsresizestop', function(event, element) {

      // Get viz id
      var dataVizId = self.$(element).attr('data-viz-id');

      // Get visualization and increment resizeIndex property
      var index = self.get('visualizations').map((d,i) => { return { index: i, id: `${d.id}` } }).find(d => `${d.id}` === `${dataVizId}`).index;

      // Get obj
      var obj = self.get('visualizations').objectAt(index);

      // Update property
      Ember.set(obj, 'resizeIndex', obj.resizeIndex+1);

      // Set styles
      self.$(element).removeClass('hovering').css('opacity', 1);

    });

  }

});
