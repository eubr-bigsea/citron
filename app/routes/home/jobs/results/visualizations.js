import Route from '@ember/routing/route';
import config from '../../../../config/environment';

export default Route.extend({
  model(params) {
    this._super(...arguments);

    // Job id
    params.job = this.store.findRecord('job', params.jobId);

    // Set data url
    params.dataUrl = [
      config.caipirinha,
      "visualizations",
      params.jobId,
      params.taskId
    ].join('/');

    // Set component name for data visualization
    params.component = ['visualizations',params.visu].join('/').replace('bar-chart', 'vertical-bar-chart');

    return params;
  }
});
