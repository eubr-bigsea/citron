import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    this.controllerFor('job.show').set('stepsLogs', Ember.A());
    return RSVP.hash({
      job: this.store.findRecord('job', params.id),
      operations: this.store.query('operation', {})
    });
  },
});
