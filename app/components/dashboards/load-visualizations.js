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

  })

});
