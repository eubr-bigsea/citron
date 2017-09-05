import Ember from 'ember';
import RSVP from 'rsvp';

const { inject: { service } } = Ember

export default Ember.Route.extend({
  i18n: service(),

  model(params) {
    this.controllerFor('job.show').set('stepsLogs', Ember.A());

    let queryParams = {
      lang: this.get('i18n.locale')
    };

    return RSVP.hash({
      job: this.store.findRecord('job', params.id),
      operations: this.store.query('operation', queryParams)
    });
  },
});
