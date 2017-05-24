import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({

  model(params) {
    return RSVP.hash({
      job: this.store.findRecord('job', params.id),
      operations: this.store.query('operation', {})
    });
  },
});
