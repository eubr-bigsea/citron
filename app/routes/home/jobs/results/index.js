import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      job: this.store.findRecord('job', params.id),
      operations: this.store.query('operation', {})
    });
  },
});
