import Controller from '@ember/controller';

export default Controller.extend({
  init(){
    this._super(...arguments);

    const binded = this.get('saveDashboardUnbided').bind(this);
    this.set('saveDashboard', binded);
  },

  saveDashboardUnbided(dashboard) {
    const conf = {};

    // Initialize items
    dashboard.$('.grid-stack-item.ui-draggable').each(function () {
      // Get node
      const node = dashboard.$(this).data('_gridstack_node');

      // Get attrs
      const vizId  = dashboard.$(this).attr('data-viz-id');
      const taskId = dashboard.$(this).attr('data-viz-task-id');
      const jobId  = dashboard.$(this).attr('data-viz-job-id');

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
    const visBackup = this.get('model.visualizations');
    this.set('model.configuration', conf);
    this.set('model.visualizations', []);
    this.get('model').save();
    this.set('model.visualizations', visBackup);
  }
});
