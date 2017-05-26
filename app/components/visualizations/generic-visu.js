import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('url', [
      config.caipirinha,
      "visualizations",
      this.get('params.jobId'),
      this.get('params.taskId')
    ].join('/'));

    this.set('visu', "visualizations/" + this.get('params.visu'));
  }
});
