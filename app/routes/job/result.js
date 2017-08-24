import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    params.job = this.store.findRecord('job', params.jobId);
    params.dataUrl = [
      config.caipirinha,
      "visualizations",
      params.jobId,
      params.taskId
    ].join('/');

    params.component = params.visu;

    return params;
  }
});
