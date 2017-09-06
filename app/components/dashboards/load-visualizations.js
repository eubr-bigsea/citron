import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-dashboard-canvas"],

  // Initialize data
  isEmpty: Ember.computed.empty('visualizations'),
  visualizations: Ember.computed('model', function() {

    // Store this
    var self = this;

    // Iterate over visualizations to update parameters
    self.get('model.visualizations').forEach(v => {

      // Set data url
      v.dataUrl = [
        config.caipirinha,
        "visualizations",
        v.job_id,
        v.task_id
      ].join('/');

      // Set component name for data visualization
      v.component = ['visualizations',v.type.name].join('/').replace('bar-chart', 'vertical-bar-chart');

      // Get configuration
      var conf = self.get('model.configuration') == null ? {} : self.get('model.configuration');
      var item = conf[`${v.id}`] == null ? {} : conf[`${v.id}`];

      // Set initial style and layouts
      v.x = item.x == null || isNaN(+item.x) ? 0 : +item.x;
      v.y = item.y == null || isNaN(+item.y) ? 0 : +item.y;
      v.width = item.width == null || isNaN(+item.width) ? 4 : +item.width;
      v.height = item.height == null || isNaN(+item.height) ? 3 : +item.height;

    });

    return self.get('model.visualizations');

  }),

  // After insert elements
  didInsertElement() {

    // Store this
    var self = this;

    // Initialize gridstack
    self.set('gs', self.$('.grid-stack').gridstack({
      alwaysShowResizeHandle: true,
    }));

    // On resize start
    self.get('gs').on('resizestart', function(event) {

      // Get grid and element
      var element = event.target;

      // Set styles
      self.$(element).removeClass('hovering').addClass('hovering').css('opacity', 0.6);

    });

    // On resize stop
    self.get('gs').on('gsresizestop', function(event, element) {

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

  },

  actions: {

    save() {

      // Store this
      var self = this;
      var conf = {};

      // Initialize items
      self.$('.grid-stack-item.ui-draggable').each(function () {

        // Get node
        var node = self.$(this).data('_gridstack_node');

        // Get attrs
        var vizId  = self.$(this).attr('data-viz-id');
        var taskId = self.$(this).attr('data-viz-task-id');
        var jobId  = self.$(this).attr('data-viz-job-id');

        // Save node to items
        conf[`${vizId}`] = {
          vizId: vizId,
          taskId: taskId,
          jobId: jobId,
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height
        };

      });

      // Set model configuration
      self.set('model.configuration', conf);

      // Save the configuration on dashboard
      self.get('model').save();

    }

  }

});
