import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    params.job = this.store.findRecord('job',params.jobId);
    return params;
  }
});
