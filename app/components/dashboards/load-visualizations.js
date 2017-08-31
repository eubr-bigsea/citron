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

      // Set styles
      self.$(element).removeClass('hovering').css('opacity', 1);

    });

  }

});
